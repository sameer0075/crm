import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

import prisma from '@/lib/prisma'; // Import your Prisma client singleton

const SettingsListHandler = async (): Promise<NextResponse> => {
  try {
    const data = await prisma.followUpSettings.findMany();

    return NextResponse.json(
      {
        success: true,
        message: 'Settings fetched successfully',
        data,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    throw new ApiError(
      StatusCode.badrequest,
      error.errors ? error.errors[0]?.message : error.message
    );
  }
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
  return globalErrorHandler(SettingsListHandler)(req);
};
