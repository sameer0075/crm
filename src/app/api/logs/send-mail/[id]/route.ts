import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';

import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { timeConversion } from '@/utils/helper-functions';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getTimeForRound(round: number): Promise<number | null> {
  const setting = await prisma.followUpSettings.findFirst({
    where: { round },
  });

  if (!setting) {
    return null;
  }

  return timeConversion({ time: setting.time, unit: setting.unit });
}

const handleRecordVisibility = async (
  record: records,
  recordStatus: record_status
) => {
  if (recordStatus.name === 'Connected & Email Sent') {
    const now = new Date();
    const nextRound = record?.round ? record.round + 1 : 1;
    const timeForNextRound = await getTimeForRound(nextRound);

    if (!timeForNextRound) {
      throw new ApiError(StatusCode.badrequest, 'No Follow Up Settings Found!');
    }

    const nextVisibility = new Date(now.getTime() + timeForNextRound);

    return {
      visibleAfter: nextVisibility,
      lastContacted: now,
      round: nextRound,
    };
  }
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

    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
      include: {
        role: true,
      },
    });

    if (user && user.role && record && user.role.name !== 'ADMIN') {
      if (user.id != record.userId) {
        throw new ApiError(StatusCode.badrequest, 'Record not found!');
      }
    }

    if (!record) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }

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

    let nextRecordId;
    if (callLogs !== 0) {
      const recordStatus = await prisma.record_status.findFirst({
        where: {
          name: 'Connected & Email Sent',
        },
      });

      const visibility = await handleRecordVisibility(record, recordStatus);
      console.log('visibility', visibility);
      if (recordStatus && visibility) {
        if (record.type === 'FOLLOW_UP_LEAD') {
          const nextRecord = await prisma.records.findFirst({
            where: {
              autoNumber: {
                gt: record.autoNumber,
              },
              type: 'LEAD',
              is_active: true,
            },
            orderBy: {
              autoNumber: 'asc',
            },
          });
          nextRecordId = nextRecord.id;

          await prisma.records.update({
            where: {
              id: record.id,
            },
            data: {
              recordStatusId: recordStatus.id,
              type: 'OPPORTUNITY',
              visibleAfter: visibility.visibleAfter,
              lastContacted: visibility.lastContacted,
              round: visibility.round,
            },
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully.',
        nextRecordId,
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
