import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { StatusCode } from '@/utils/enums';
import { RoleGuard } from '@/lib/middleware/role-guard';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

const usersListHandler = async (): Promise<NextResponse> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          name: {
            not: 'ADMIN',
          },
        },
      },
    });
    return NextResponse.json(
      { message: 'Users fetched successfully!', data: users, success: true },
      { status: 200 }
    );
  } catch (error) {
    throw new ApiError(StatusCode.internalservererror, error.message);
  }
};
// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  RoleGuard /*, otherMiddlewares */
);

export const GET = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(usersListHandler)(req);
};
