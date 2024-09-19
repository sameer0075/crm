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
const CommentsListHandler = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    if (!id) {
      throw new ApiError(StatusCode.badrequest, 'Record id is required!');
    }

    const record = await prisma.records.findFirst({
      where: {
        id,
        is_active: true,
      },
    });

    if (!record) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }

    // const { skip = 0, take = 5 } = req.pagination || {};

    const [comments] = await Promise.all([
      prisma.comments.findMany({
        where: { recordId: id },
        include: {
          record: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        // skip,
        // take,
      }),
      // prisma.comments.count({ where: { recordId: id } }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Comments Fetched successfully',
        data: comments,
        // totalCount,
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
  return globalErrorHandler(CommentsListHandler)(req);
};
