import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode, RecordsEnum } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { paginationMiddleware } from '@/lib/middleware/pagination-middleware';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

/**
 * Handles the GET request to fetch records by type.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the records data
 */
const VisibleRecordsListHandler = async (
  req: NextRequest
): Promise<NextResponse> => {
  const type = req.nextUrl.pathname.split('/').pop();
  if (!type) {
    throw new ApiError(StatusCode.badrequest, 'Record type is required!');
  }

  if (!RecordsEnum.includes(type)) {
    throw new ApiError(
      StatusCode.badrequest,
      'Record with such type doesn`t exist!'
    );
  }

  const { skip = 0, take = 5 } = req.pagination || {};
  const now = new Date();

  const [records, totalCount] = await Promise.all([
    prisma.records.findMany({
      where: {
        type,
        visibleAfter: {
          lte: now,
        },
        is_active: true,
      },
      skip,
      take,
    }),
    prisma.records.count({
      where: {
        type,
        visibleAfter: {
          lte: now,
        },
        is_active: true,
      },
    }),
  ]);

  return NextResponse.json(
    {
      success: true,
      message: 'Record Fetched successfully',
      data: records,
      totalCount,
    },
    { status: StatusCode.success }
  );
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
  return globalErrorHandler(VisibleRecordsListHandler)(req);
};
