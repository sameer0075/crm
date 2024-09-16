import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { PrismaClient } from '@prisma/client';
import {
  CreateActivityLog,
  CreateEmptyACtivityLog,
} from '../helper-functions/common';

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
      const log = await CreateActivityLog(req, event, record.id);
      const openPhonePayload = {
        openphoneId: event.id,
        openPhoneVersion: event.apiVersion,
        eventCreation: event.createdAt,
        messageId: event.data.object.id,
        messageFrom: event.data.object.from,
        messageTo: event.data.object.to,
        messageDirection: event.data.object.direction,
        messageStatus: event.data.object.status,
        messageUserId: event.data.object.userId,
        messagePhoneNumberId: event.data.object.phoneNumberId,
        messageConversationId: event.data.object.conversationId,
        messageBody: event.data.object.body,
        messageMedia: event.data.object.media || [],
        messagePhoneJson: event,
        logId: log.id,
      };

      await prisma.openphone_message_log.create({
        data: openPhonePayload,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'OpenPhone Message Log Synced',
        },
        { status: StatusCode.success }
      );
    } else {
      const log = await CreateEmptyACtivityLog(event);
      return NextResponse.json(log.notFoundText, {
        status: StatusCode.success,
      });
    }
  } catch (error) {
    console.log('error---', error);
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

export const POST = async (req: NextRequest) => {
  // Call the main handler
  return globalErrorHandler(OpenPhoneMessageHandler)(req);
};
