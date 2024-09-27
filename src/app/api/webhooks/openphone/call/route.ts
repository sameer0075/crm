import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function formatTimeDifference(date1, date2) {
  // Convert the date strings to Date objects if they are not already
  date1 = new Date(date1);
  date2 = new Date(date2);

  const msDifference = Math.abs(date2 - date1); // Difference in milliseconds
  const totalSeconds = msDifference / 1000;

  // Break down the total time difference
  const hours = Math.floor(totalSeconds / 3600); // Get the number of hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Get the number of minutes
  const seconds = (totalSeconds % 60).toFixed(1); // Get the remaining seconds (to 1 decimal point)

  // Build the readable response
  let response = '';

  if (hours > 0) response += `${hours} hour${hours !== 1 ? 's' : ''} `;
  if (minutes > 0) response += `${minutes} minute${minutes !== 1 ? 's' : ''} `;
  if (seconds > 0) response += `${seconds} second${seconds !== 1 ? 's' : ''}`;

  return response.trim();
}

const OpenPhoneHandler = async (req: NextRequest) => {
  const event = await req.json();
  console.log('event', event);
  try {
    const record = await prisma.records.findFirst({
      where: {
        phone: event.data.object.to,
      },
    });
    const differenceInSeconds = formatTimeDifference(
      event.data.object.createdAt,
      event.data.object.completedAt
    );
    if (record) {
      if (event.type == 'call.recording.completed') {
        const log = await prisma.activity_logs.findFirst({
          where: {
            messageCallId: event.data.object.id,
          },
        });

        if (log) {
          console.log('event.data.object.media', event.data.object.media);
          await prisma.activity_logs.update({
            where: {
              id: log.id,
            },
            data: {
              audio: event.data.object.media,
            },
          });

          return NextResponse.json(
            {
              success: true,
              message: 'OpenPhone Call Log Synced',
            },
            { status: StatusCode.success }
          );
        }
      } else {
        const payload = {
          type: event.data.object.object,
          logType: 'LEAD',
          openPhoneType: event.type,
          callDuration: String(differenceInSeconds),
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
          eventPayload: JSON.stringify(event),
        };

        await prisma.activity_logs.create({ data: payload });
        return NextResponse.json(
          {
            success: true,
            message: 'OpenPhone Call Log Synced',
          },
          { status: StatusCode.success }
        );
      }
    } else {
      await prisma.failed_activity_logs.create({
        data: {
          failMessage: 'Record not found!',
          openPhonePayload: JSON.stringify(event),
        },
      });
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }
  } catch (error) {
    await prisma.failed_activity_logs.create({
      data: {
        failMessage: JSON.stringify(error.message),
        openPhonePayload: JSON.stringify(event),
      },
    });
    console.log('error---', error);
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

export const POST = async (req: NextRequest) => {
  // Call the main handler
  return globalErrorHandler(OpenPhoneHandler)(req);
};
