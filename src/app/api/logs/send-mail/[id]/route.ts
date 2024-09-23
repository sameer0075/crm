import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { v2 as cloudinary } from 'cloudinary';

import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { sendEmailWithBrevo } from '@/utils/strategies/brevo.strategy';
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

    const emailData = {
      sender: { email: process.env.EMAIL_FROM },
      to: JSON.parse(to)?.map((email: string) => ({ email })),
      cc:
        JSON.parse(cc)?.length > 0
          ? JSON.parse(cc).map((email: string) => ({ email }))
          : null,
      bcc:
        JSON.parse(bcc)?.length > 0
          ? JSON.parse(bcc).map((email: string) => ({ email }))
          : null,
      subject,
      htmlContent: text,
    };

    if (attachmentUploads?.length > 0) {
      emailData.attachment = attachmentUploads.map(
        (file: { url: string }, index: number) => ({
          url: file.url,
          name:
            attachments && attachments[index]?.name
              ? attachments[index]?.name
              : 'Email Attachment',
        })
      );
    }
    await sendEmailWithBrevo(emailData);

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

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully.',
      },
      { status: StatusCode.success }
    );
  } catch (error) {
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
