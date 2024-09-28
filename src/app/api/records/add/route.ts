import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { recordsSchema } from '@/utils/schemas/records.schema';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

import prisma from '@/lib/prisma'; // Import your Prisma client singleton

/**
 * The API handler for adding a new record.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the new record information
 */
const addRecordHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const payload = recordsSchema.parse(body);
  const recordExists = await prisma.records.findFirst({
    where: {
      type: payload.type,
      OR: [
        { email: payload.email },
        {
          phone: payload.phone,
        },
      ],
    },
  });

  if (recordExists) {
    throw new ApiError(
      StatusCode.badrequest,
      'Record with this email or phone already exists.'
    );
  }

  const data = await prisma.records.create({
    data: payload,
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Record created successfully',
      data,
    },
    { status: StatusCode.success }
  );
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
  return globalErrorHandler(addRecordHandler)(req);
};
