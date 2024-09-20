import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import nodemailer from 'nodemailer';

import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
const prisma = new PrismaClient();

const MailLogHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const { to, subject, text } = await req.json();

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
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_MAIL}>`, // "Danish <danishtest593@gmail.com>"
      to,
      cc: process.env.CC_EMAIL,
      bcc: process.env.BCC_EMAIL,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

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
      to,
    };

    const activityLog = await prisma.activity_logs.create({ data: logPayload });

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully.',
        data: activityLog,
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
