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

const OpenPhoneHandler = async (req: NextRequest) => {
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
        callId: event.data.object.id,
        callFrom: event.data.object.from,
        callTo: event.data.object.to,
        callDirection: event.data.object.direction,
        callStatus: event.data.object.status,
        callUserId: event.data.object.userId,
        callPhoneNumberId: event.data.object.phoneNumberId,
        callConversationId: event.data.object.conversationId,
        openPhoneJson: event,
        logId: log.id,
      };

      await prisma.openphone_phone_log.create({
        data: openPhonePayload,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'OpenPhone Call Log Synced',
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
  return globalErrorHandler(OpenPhoneHandler)(req);
};
