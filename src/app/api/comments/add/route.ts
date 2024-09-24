import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { commentsSchema } from '@/utils/schemas/comment.schema';

const prisma = new PrismaClient();

const evaluateRecordType = async (status: string, recordId: string) => {
  let type = '';
  const callLogs = await prisma.activity_logs.count({
    where: {
      recordId,
      type: 'call',
    },
  });

  if (
    status == 'Fresh' ||
    status == 'Pre Research' ||
    status == "Did'nt Connect" ||
    status == 'Voicemail'
  ) {
    type = 'LEAD';
  }

  if (
    status == 'Out of Office' ||
    status == 'Call Back Later' ||
    status == 'Refer to another person'
  ) {
    if (callLogs === 0) {
      throw new ApiError(
        StatusCode.badrequest,
        'Atleast one phone call is required for this!'
      );
    }
    type = 'FOLLOW_UP_LEAD';
  }

  if (status == 'Connected & Email Sent') {
    const emailLogs = await prisma.activity_logs.count({
      where: {
        recordId,
        type: 'email',
      },
    });

    if (callLogs === 0 || emailLogs === 0) {
      throw new ApiError(
        StatusCode.badrequest,
        'Atleast one phone call & email is required for this!'
      );
    }
    type = 'OPPORTUNITY';
  }

  return type;
};

const AddCommentHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  try {
    const payload = commentsSchema.parse(body);
    const { status, ...rest } = payload;
    const recordStatus = await prisma.record_status.findFirst({
      where: {
        id: status,
      },
    });

    const record = await prisma.records.findFirst({
      where: {
        id: rest.recordId,
      },
      include: {
        recordStatus: {
          select: {
            statusCode: true,
          },
        },
      },
    });

    if (record) {
      if (recordStatus.statusCode < record.recordStatus.statusCode) {
        throw new ApiError(
          StatusCode.badrequest,
          'Previous Status Code cannot be selected!'
        );
      }

      if (recordStatus.statusCode === record.recordStatus.statusCode) {
        throw new ApiError(StatusCode.badrequest, 'Change your status!');
      }
    }

    const recordType = await evaluateRecordType(recordStatus?.name, record?.id);
    const data = await prisma.comments.create({
      data: {
        ...rest,
        userId: req.userId,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
    });

    const logPayload = {
      type: 'comment',
      logType: 'LEAD',
      record: {
        connect: {
          id: payload.recordId,
        },
      },
      eventCreation: new Date(),
      from: user.phone,
    };

    const activityLog = await prisma.activity_logs.create({ data: logPayload });
    await prisma.records.update({
      where: {
        id: rest.recordId,
      },
      data: {
        recordStatusId: status,
        type: recordType,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Comment created successfully',
        data,
        log: activityLog,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    throw new ApiError(
      StatusCode.badrequest,
      error.errors ? error.errors[0]?.message : error.message
    );
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
  return globalErrorHandler(AddCommentHandler)(req);
};
