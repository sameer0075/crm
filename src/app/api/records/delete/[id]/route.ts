import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';

import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { recordsSchema } from '@/utils/schemas/records.schema';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

const prisma = new PrismaClient();

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

  // Get the record id from the URL
  const id = req.nextUrl.pathname.split('/').pop();
  if (!id) {
    // If the record id is missing, throw a bad request error
    throw new ApiError(StatusCode.badrequest, 'Record id is required!');
  }

  // Check if the record exists
  const recordExists = await prisma.records.findFirst({
    where: {
      type: payload.type,
      id,
    },
  });

  if (!recordExists) {
    // If the record does not exist, throw a bad request error
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

  // Return the response
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
