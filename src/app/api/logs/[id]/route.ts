import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { paginationMiddleware } from '@/lib/middleware/pagination-middleware';
const prisma = new PrismaClient();

/**
 * Handles the GET request to fetch records by type.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the records data
 */
const ActivityLogsListHandler = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    const type = req.nextUrl.searchParams.get('type');
    if (!id) {
      throw new ApiError(StatusCode.badrequest, 'Record id is required!');
    }

    const record = await prisma.records.findFirst({
      where: {
        id,
        is_active: true,
      },
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

    let logs;
    if (type && type != 'all') {
      logs = await prisma.activity_logs.findMany({
        where: {
          recordId: id,
          type,
          record: {
            is_active: true,
          },
        },
        orderBy: {
          createdAt: 'desc', // Replace 'createdAt' with the column you want to sort by
        },
      });
    } else {
      logs = await prisma.activity_logs.findMany({
        where: {
          recordId: id,
          record: {
            is_active: true,
          },
        },
        orderBy: {
          createdAt: 'desc', // Replace 'createdAt' with the column you want to sort by
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Activity Logs Fetched successfully.',
        data: logs,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    console.log('error', error);
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  jwtMiddleware,
  paginationMiddleware
);

export const GET = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(ActivityLogsListHandler)(req);
};
