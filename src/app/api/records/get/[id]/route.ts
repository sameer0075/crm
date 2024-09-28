import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

import prisma from '@/lib/prisma'; // Import your Prisma client singleton

/**
 * Handles the GET request to fetch records by type.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the records data
 */
const GetRecordHandler = async (req: NextRequest): Promise<NextResponse> => {
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    throw new ApiError(StatusCode.badrequest, 'Record id is required!');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
    include: {
      role: true,
    },
  });

  const record = await prisma.records.findFirst({
    where: { id, is_active: true },
    include: {
      recordStatus: true,
    },
  });

  if (user && user.role && record && user.role.name !== 'ADMIN') {
    if (user.id != record.userId) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }
  }

  if (!record) {
    throw new ApiError(StatusCode.badrequest, 'Record not found!');
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Record Fetched successfully',
      data: record,
    },
    { status: StatusCode.success }
  );
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
  return globalErrorHandler(GetRecordHandler)(req);
};
