import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import { commentsSchema } from '@/utils/schemas/comment.schema';

const prisma = new PrismaClient();

/**
 * The API handler for adding a new record.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the new record information
 */
const AddCommentHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  try {
    const payload = commentsSchema.parse(body);

    const data = await prisma.comments.create({
      data: {
        ...payload,
        userId: req.userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Comment created successfully',
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

export const POST = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(AddCommentHandler)(req);
};
