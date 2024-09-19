import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OpenPhoneMessageHandler = async (req: NextRequest) => {
  try {
    const event = await req.json();
    const record = await prisma.records.findFirst({
      where: {
        phone: event.data.object.to,
      },
    });

    if (record) {
      const payload = {
        type: event.data.object.object,
        logType: 'LEAD',
        openPhoneType: event.type,
        record: {
          connect: {
            id: record?.id,
          },
        },
        openphoneId: event.id,
        openPhoneVersion: event.apiVersion,
        eventCreation: event.createdAt,
        messageCallId: event.data.object.id,
        from: event.data.object.from,
        to: event.data.object.to,
        direction: event.data.object.direction,
        status: event.data.object.status,
        openPhoneUserId: event.data.object.userId,
        phoneNumberId: event.data.object.phoneNumberId,
        conversationId: event.data.object.conversationId,
        body: event.data.object.body,
        media: event.data.object.media,
        eventPayload: JSON.stringify(event),
      };

      await prisma.activity_logs.create({ data: payload });

      return NextResponse.json(
        {
          success: true,
          message: 'OpenPhone Message Log Synced',
        },
        { status: StatusCode.success }
      );
    } else {
      await prisma.failed_activity_logs.create({
        data: {
          failMessage: 'Record not found!',
          openPhonePayload: JSON.stringify(event),
        },
      });
      throw new ApiError(StatusCode.badrequest, 'Record Not Found');
    }
  } catch (error) {
    console.log('error---', error);
    await prisma.failed_activity_logs.create({
      data: {
        failMessage: JSON.stringify(error.message),
        openPhonePayload: JSON.stringify(event),
      },
    });
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

export const POST = async (req: NextRequest) => {
  // Call the main handler
  return globalErrorHandler(OpenPhoneMessageHandler)(req);
};
