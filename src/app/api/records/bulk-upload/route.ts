import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { StatusCode } from '@/utils/enums';
import { join } from 'path';
import { Workbook } from 'exceljs';

import { existsSync, unlinkSync } from 'fs';
import { recordsSchema } from '@/utils/schemas/records.schema';
import {
  fileHandling,
  isValidFile,
  validateEmail,
} from '@/utils/helper-functions';
import { RoleGuard } from '@/lib/middleware/role-guard';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

const bulkUploadHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file || !(file instanceof File)) {
      throw new ApiError(StatusCode.badrequest, 'File is required.');
    }
    const validFile = !isValidFile(file);
    // Validating File
    if (validFile) {
      throw new ApiError(
        StatusCode.badrequest,
        'Invalid file type. Only CSV and Excel files are allowed.'
      );
    }

    const tempDir = '/tmp';
    const tempFilePath = join(tempDir, 'uploaded-file.xlsx');
    // Create Path if not present
    await fileHandling(tempDir, tempFilePath, file);

    const workbook = new Workbook();
    await workbook.xlsx.readFile(tempFilePath);
    const worksheet = workbook.getWorksheet(1)
      ? workbook.getWorksheet(1)
      : workbook.getWorksheet();
    if (!worksheet) {
      throw new ApiError(
        StatusCode.internalservererror,
        'Worksheet not found.'
      );
    }

    const records = [];
    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      rows.push(row);
    });

    for (let i = 0; i < rows?.length; i++) {
      const row = rows[i];
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
      const recordStatus = await prisma.record_status.findFirst({
        where: {
          name: 'Fresh',
        },
      });
      console.log('req.userId', req.userId);
      const payload = {
        company: String(company),
        website: String(website?.hyperlink),
        city,
        state,
        country,
        industry,
        company_linkedin_url: String(company_linkedin_url?.hyperlink),
        firstName,
        lastName,
        email: validateEmail(email) ? email : '',
        fullName: `${firstName} ${lastName ?? ''}`,
        title,
        linkedin_profile: String(linkedin_profile?.hyperlink),
        phone: String(phone),
        lead_source,
        type: 'LEAD',
        status: 'ACTIVE',
        recordStatusId: recordStatus?.id,
        userId: req.userId,
      };

      try {
        const recordExists = await prisma.records.findFirst({
          where: {
            type: payload.type,
            OR: [{ email: payload.email }, { phone: payload.phone }],
          },
        });

        if (recordExists) {
          throw new ApiError(
            StatusCode.badrequest,
            `Record with this email or phone already exists. Check row number ${i + 2}.`
          );
        }
      } catch (error) {
        throw new ApiError(
          StatusCode.badrequest,
          `Record with this email or phone already exists. Check row number ${i + 2}`
        );
      }

      try {
        const validatedPayload = recordsSchema.parse(payload);
        records.push(validatedPayload);
      } catch (error) {
        const message = `${error?.errors[0]?.message}. Error occurred at row number: ${row.number}.`;
        throw new ApiError(StatusCode.internalservererror, message);
      }
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
          in: records.map((record) => record.email),
        },
      },
    });

    return NextResponse.json(
      { message: 'File processed successfully!', data: insertedRecords },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(StatusCode.internalservererror, error.message);
  } finally {
    const tempDir = '/tmp';
    const tempFilePath = join(tempDir, 'uploaded-file.xlsx');
    if (existsSync(tempFilePath)) {
      await unlinkSync(tempFilePath);
    }
  }
};
// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  RoleGuard /*, otherMiddlewares */
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
