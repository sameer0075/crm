import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient, record_status, records } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { commentsSchema } from '@/utils/schemas/comment.schema';
import { timeConversion } from '@/utils/helper-functions';

const prisma = new PrismaClient();

const generateCallError = async (
  phoneLogsCount: number,
  status: string,
  recordId: string
) => {
  if (
    phoneLogsCount == 0 &&
    (status === 'Out of Office' ||
      status === 'Call Back Later' ||
      status === 'Refer to another person' ||
      status === 'Call Connected & Interested' ||
      status === 'Connected & Email Sent')
  ) {
    throw new ApiError(
      StatusCode.badrequest,
      'Phone Call must be initiated for this status!'
    );
  } else if (phoneLogsCount > 0) {
    const mailLogs = await prisma.activity_logs.count({
      where: {
        recordId,
        type: 'email',
      },
    });

    if (mailLogs === 0 && status === 'Connected & Email Sent') {
      throw new ApiError(
        StatusCode.badrequest,
        'Phone Call and Email both must be initiated for this status!'
      );
    }
  }
};

const evaluateRecordType = async (status: string, recordId: string) => {
  let type = '';
  const callLogs = await prisma.activity_logs.count({
    where: {
      recordId,
      type: 'call',
    },
  });

  await generateCallError(callLogs, status, recordId);

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
    status == 'Refer to another person' ||
    status == 'Call Connected & Interested'
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

  if (status == 'Keep on Follow Up' || status == 'Follow Up on Custom Date') {
    type = 'FOLLOW_UP_OPPORTUNITY';
  }

  return type;
};

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
  recordStatus: record_status,
  customDate?: Date | null
) => {
  const now = new Date();

  if (
    recordStatus.name === 'Connected & Email Sent' ||
    recordStatus.name === 'Keep on Follow Up'
  ) {
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
  } else if (recordStatus.name === 'Follow Up on Custom Date' && customDate) {
    const nextVisibility = new Date(customDate);
    return {
      visibleAfter: nextVisibility,
      lastContacted: now,
      round: record?.round,
    };
  }
};

const AddCommentHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  try {
    const payload = commentsSchema.parse(body);
    const { status, customDate, ...rest } = payload;
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

    if (
      record?.round >= 2 &&
      recordStatus.name === 'Follow Up on Custom Date'
    ) {
      throw new ApiError(
        StatusCode.badrequest,
        'Custom Date settings cannot be applied on Default Follow Up Settings!'
      );
    }

    if (record?.round === 5) {
      const notInterestedStatus = await prisma.record_status.findFirst({
        where: {
          name: 'Not Interested',
          statusFor: 'OPPORTUNITY',
        },
      });

      return await prisma.records.update({
        where: {
          id: rest.recordId,
        },
        data: {
          recordStatusId: notInterestedStatus.id,
        },
      });
    }

    if (record) {
      if (recordStatus.statusCode < record.recordStatus.statusCode) {
        throw new ApiError(
          StatusCode.badrequest,
          'Previous Status Code cannot be selected!'
        );
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
    if (
      record.type === 'OPPORTUNITY' ||
      record.type === 'FOLLOW_UP_OPPORTUNITY'
    ) {
      if (
        recordStatus.name == 'Keep on Follow Up' ||
        recordStatus.name == 'Follow Up on Custom Date'
      ) {
        const visibility = await handleRecordVisibility(
          record,
          recordStatus,
          customDate
        );
        console.log('visibility', visibility);
        await prisma.records.update({
          where: {
            id: rest.recordId,
          },
          data: {
            recordStatusId: status,
            type: recordType,
            visibleAfter: visibility.visibleAfter,
            lastContacted: visibility.lastContacted,
            round: visibility.round,
          },
        });
      }
    } else {
      await prisma.records.update({
        where: {
          id: rest.recordId,
        },
        data: {
          recordStatusId: status,
          type: recordType,
        },
      });
    }

    let nextRecordId;
    if (
      recordStatus.name === 'Book A Meeting' ||
      recordStatus.name === 'Connected & Email Sent'
    ) {
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
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Comment created successfully',
        data,
        log: activityLog,
        nextRecordId,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    console.log(error);
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
