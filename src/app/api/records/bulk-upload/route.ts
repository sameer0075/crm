import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { StatusCode } from '@/utils/enums';
import { join } from 'path';
import { Workbook } from 'exceljs';

import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { recordsSchema } from '@/utils/schemas/records.schema';
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

const validateEmail = (email: string | undefined) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// utils/validateFile.ts

const isValidFile = (file: File): boolean => {
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
    'application/csv', // CSV
    'text/csv', // CSV
  ];

  const allowedExtensions = ['.csv', '.xlsx'];

  // Check MIME type
  if (!allowedMimeTypes.includes(file.type)) {
    console.log(`Invalid MIME type: ${file.type}`);
    return false;
  }

  // Check file extension
  const fileExtension = file.name
    .slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)
    .toLowerCase();
  console.log('fileExtension', fileExtension);
  if (!allowedExtensions.includes(`.${fileExtension}`)) {
    console.log(`Invalid file extension: .${fileExtension}`);
    return false;
  }

  return true;
};

const bulkUploadHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file || !(file instanceof File)) {
      throw new ApiError(StatusCode.badrequest, 'File is required');
    }
    const validFile = !isValidFile(file);

    if (validFile) {
      throw new ApiError(
        StatusCode.badrequest,
        'Invalid file type. Only CSV and Excel files are allowed.'
      );
    }

    const tempDir = join(process.cwd(), 'temp');
    const tempFilePath = join(tempDir, 'uploaded-file.xlsx'); // Assuming the file is Excel, not CSV

    // Ensure the temp directory exists
    if (!existsSync(tempDir)) {
      mkdirSync(tempDir, { recursive: true });
    }

    // Save the file to a temporary location
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileStream = createWriteStream(tempFilePath);
    fileStream.write(buffer);
    fileStream.end();

    // Wait for the file stream to finish writing
    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });

    const workbook = new Workbook();
    await workbook.xlsx.readFile(tempFilePath);
    const worksheet = workbook.getWorksheet(1);

    // Check if worksheet exists
    if (!worksheet) {
      throw new ApiError(StatusCode.internalservererror, 'Worksheet not found');
    }

    const records = [];
    const existingEmails: string[] = [];
    const existingPhones: string[] = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const [
        company,
        website,
        city,
        state,
        country,
        industry,
        company_linkedin_url,
        firstName,
        lastName,
        email,
        title,
        linkedin_profile,
        phone,
        lead_source,
      ] = row.values.slice(1);
      const payload = {
        company: String(company) ?? 'Test Company',
        website: website?.hyperlink ?? 'www.test.com',
        city,
        state,
        country,
        industry,
        company_linkedin_url: company_linkedin_url?.hyperlink,
        firstName,
        lastName,
        email: validateEmail(email)
          ? email
          : `test-email${new Date().getTime()}@gmail.com`,
        fullName: `${firstName} ${lastName}`,
        title,
        linkedin_profile: linkedin_profile?.hyperlink,
        phone: String(phone) ?? '090078601',
        lead_source,
        type: 'LEAD',
        status: 'ACTIVE',
      };

      try {
        const validatedPayload = recordsSchema.parse(payload);
        if (validatedPayload.email) existingEmails.push(validatedPayload.email);
        if (validatedPayload.phone) existingPhones.push(validatedPayload.phone);
        records.push(validatedPayload);
      } catch (error) {
        const message = `${error?.errors[0]?.code} ${error?.errors[0]?.message}. Error Occured at row number: ${rowNumber}`;
        throw new ApiError(StatusCode.internalservererror, message);
      }
    });

    const existingRecords = await prisma.records.findMany({
      select: {
        email: true,
        phone: true,
      },
      where: {
        OR: [
          { email: { in: existingEmails } },
          { phone: { in: Array.from(existingPhones) } },
        ],
      },
    });

    if (existingRecords.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          status: StatusCode.badrequest,
          message: 'Some records already exist',
          timestamp: new Date().getTime(),
          existingRecords: existingRecords,
        }),
        { status: StatusCode.badrequest }
      );
    }

    const response = [];
    // Insert data into the database in chunks to avoid memory issues
    const CHUNK_SIZE = 100; // Adjust based on your needs
    for (let i = 0; i < records.length; i += CHUNK_SIZE) {
      const chunk = records.slice(i, i + CHUNK_SIZE);
      const record = await prisma.records.createMany({
        data: chunk,
      });
      response.push(record);
    }

    const insertedRecords = await prisma.records.findMany({
      where: {
        email: {
          in: records.map((record) => record.email), // Adjust to match your unique field
        },
      },
    });

    return NextResponse.json(
      { message: 'File processed successfully!', data: insertedRecords },
      { status: 200 }
    );
  } catch (error) {
    throw new ApiError(StatusCode.internalservererror, error.message);
  } finally {
    const tempDir = join(process.cwd(), 'temp');
    const tempFilePath = join(tempDir, 'uploaded-file.xlsx');
    if (existsSync(tempFilePath)) {
      await unlinkSync(tempFilePath);
    }
  }
};
// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  jwtMiddleware /*, otherMiddlewares */
);

export const POST = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(bulkUploadHandler)(req);
};
