import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { StatusCode } from '@/utils/enums';
import { recordsSchema } from '@/utils/schemas/records.schema';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

import prisma from '@/lib/prisma'; // Import your Prisma client singleton

/**
 * Handles the PUT request to delete a record.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the deleted record information
 */
const deleteRecordHandler = async (req: NextRequest): Promise<NextResponse> => {
  // Parse the request body
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
    },
  });

  if (!recordExists) {
    throw new ApiError(
      StatusCode.badrequest,
      'Record with this type does not exists!'
    );
  }

  // Delete the record
  const data = await prisma.records.update({
    where: {
      id,
    },
    data: {
      is_active: false,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: 'Record deleted successfully',
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
  return globalErrorHandler(deleteRecordHandler)(req);
};
