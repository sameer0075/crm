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
 * The API handler for updating a record.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the updated record information
 */
const updateRecordHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const payload = recordsSchema.parse(body);

  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    throw new ApiError(StatusCode.badrequest, 'Record id is required!');
  }

  const recordExists = await prisma.records.findFirst({
    where: {
      type: payload.type,
      id,
      is_active: true,
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      id: req.userId,
    },
    include: {
      role: true,
    },
  });

  if (user && user.role && recordExists && user.role.name !== 'ADMIN') {
    if (user.id != recordExists.userId) {
      throw new ApiError(StatusCode.badrequest, 'Record not found!');
    }
  }

  if (!recordExists) {
    throw new ApiError(
      StatusCode.badrequest,
      'Record with this type does not exists!'
    );
  }

  const validateRecord = await prisma.records.findFirst({
    where: {
      type: payload.type,
      OR: [
        { email: payload.email },
        {
          phone: payload.phone,
        },
      ],
      NOT: { id },
    },
  });

  if (validateRecord) {
    throw new ApiError(
      StatusCode.badrequest,
      'Record with this email or phone already exists!'
    );
  }

  const data = await prisma.records.update({
    where: {
      id,
    },
    data: payload,
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Record updated successfully',
      data,
    },
    { status: StatusCode.success }
  );
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(
  jwtMiddleware /*, otherMiddlewares */
);

export const PUT = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(updateRecordHandler)(req);
};
