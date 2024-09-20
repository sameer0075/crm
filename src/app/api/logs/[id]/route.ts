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
      });
    } else {
      logs = await prisma.activity_logs.findMany({
        where: {
          recordId: id,
          record: {
            is_active: true,
          },
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
