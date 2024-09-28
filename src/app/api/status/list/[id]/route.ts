import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

const StatusListHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const record = await prisma.records.findFirst({
      where: {
        id,
      },
    });

    if (!record) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }

    const currentStatus = await prisma.record_status.findFirst({
      where: {
        id: record.recordStatusId,
      },
    });

    if (!currentStatus) {
      throw new ApiError(StatusCode.badrequest, 'Current status not found!');
    }

    let allowedStatuses;
    console.log('currentStatus.name', currentStatus.name);

    if (currentStatus.name === 'Fresh') {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: ['Pre Research', 'Fresh'],
          },
        },
      });
    } else if (
      currentStatus.name === 'Pre Research' ||
      currentStatus.name === "Did'nt Connect" ||
      currentStatus.name === 'Voicemail' ||
      currentStatus.name === 'Receptionist' ||
      currentStatus.name === 'Out of Office' ||
      currentStatus.name === 'Call Back Later' ||
      currentStatus.name === 'Refer to another person'
    ) {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: [
              'Pre Research',
              "Did'nt Connect",
              'Voicemail',
              'Receptionist',
              'Call Connected & Interested',
              'Out of Office',
              'Call Back Later',
              'Refer to another person',
              'Not Interested',
            ],
          },
        },
      });
    } else if (currentStatus.name === 'Call Connected & Interested') {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: ['Call Connected & Interested'],
          },
        },
      });
    } else if (currentStatus.name === 'Connected & Email Sent') {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: [
              'Keep on Follow Up',
              'Follow Up on Custom Date',
              'Not Interested',
              'Book A Meeting',
            ],
          },
        },
      });
    } else if (currentStatus.name === 'Follow Up on Custom Date') {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: [
              'Follow Up on Custom Date',
              'Not Interested',
              'Book A Meeting',
            ],
          },
        },
      });
    } else if (currentStatus.name === 'Book A Meeting') {
      console.log('else if ----');
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: ['Book A Meeting', 'Not Interested'],
          },
        },
      });
    } else if (currentStatus.name === 'Not Interested') {
      allowedStatuses = await prisma.record_status.findMany({
        where: {
          name: {
            in: ['Not Interested'],
          },
        },
      });
    } else {
      // In case no matching condition is found, return all statuses
      allowedStatuses = await prisma.record_status.findMany();
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Statuses Fetched successfully',
        data: allowedStatuses,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(jwtMiddleware);

export const GET = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(StatusListHandler)(req);
};
