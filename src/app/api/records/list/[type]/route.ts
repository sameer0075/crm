import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode, RecordsEnum } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

const prisma = new PrismaClient();

const RecordsListHandler = async (req: NextRequest): Promise<NextResponse> => {
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

  // Find the user by email
  const records = await prisma.records.findMany({
    where: { type, is_active: true },
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Records Fetched successfully',
      data: records,
    },
    { status: StatusCode.success }
  );
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  jwtMiddleware /*, otherMiddlewares */
);

export const GET = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(RecordsListHandler)(req);
};
