import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

const prisma = new PrismaClient();

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

  const record = await prisma.records.findFirst({
    where: { id, is_active: true },
    include: {
      recordStatus: true,
    },
  });

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
