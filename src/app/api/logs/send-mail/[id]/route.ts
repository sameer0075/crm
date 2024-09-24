import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const MailLogHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const data = await req.formData();
    const to = data.get('to') as string;
    const cc = data.get('cc') as string | null; // cc can be null
    const bcc = data.get('bcc') as string | null; // bcc can be null
    const subject = data.get('subject') as string;
    const text = data.get('body') as string;
    const attachments = data.getAll('attachments');

    const attachmentUploads = await Promise.all(
      attachments.map(async (file: File) => {
        const content = await file.arrayBuffer();
        const buffer = Buffer.from(content);

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(new Error(error.message));
              } else {
                resolve(result); // This resolves with the Cloudinary upload result
              }
            }
          );

          // Pipe the buffer to the upload stream
          uploadStream.end(buffer);
        });
      })
    );

    if (!id) {
      throw new ApiError(StatusCode.badrequest, 'Record id is required!');
    }

    const record = await prisma.records.findFirst({
      where: { id, is_active: true },
    });

    if (!record) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }

    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: JSON.parse(to),
      cc: JSON.parse(cc ?? '[]'),
      bcc: JSON.parse(bcc ?? '[]'),
      subject: subject,
      html: text,
      attachments: await Promise.all(
        attachments?.map(async (file: File) => {
          const content = await file.arrayBuffer();
          const buffer = Buffer.from(content);
          return {
            filename: file.name,
            content: buffer,
          };
        })
      ),
    };

    await transporter.sendMail(mailOptions);
    JSON.parse(to).forEach(async (mail) => {
      const logPayload = {
        type: 'email',
        logType: 'LEAD',
        record: {
          connect: {
            id: record.id,
          },
        },
        eventCreation: new Date(),
        from: user.phone,
        to: mail,
        media: attachmentUploads ?? [],
      };
      await prisma.activity_logs.create({ data: logPayload });
    });

    const callLogs = await prisma.activity_logs.count({
      where: {
        recordId: record?.id,
        type: 'call',
      },
    });

    if (callLogs !== 0) {
      const recordStatus = await prisma.record_status.findFirst({
        where: {
          name: 'Connected & Email Sent',
        },
      });

      if (recordStatus) {
        await prisma.records.update({
          where: {
            id: record.id,
          },
          data: {
            recordStatusId: recordStatus.id,
            type: 'OPPORTUNITY',
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully.',
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    console.log(error);
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(jwtMiddleware);

export const POST = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(MailLogHandler)(req);
};
