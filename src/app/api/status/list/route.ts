import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
const prisma = new PrismaClient();

const StatusListHandler = async (): Promise<NextResponse> => {
  try {
    const statuses = await prisma.record_status.findMany();
    return NextResponse.json(
      {
        success: true,
        message: 'Statuses Fetched successfully',
        data: statuses,
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
