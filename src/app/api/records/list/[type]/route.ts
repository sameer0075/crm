import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode, RecordsEnum } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';

const prisma = new PrismaClient();

/**
 * Handles the GET request to fetch records by type.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the records data
 */
const RecordsListHandler = async (req: NextRequest): Promise<NextResponse> => {
  const type = req.nextUrl.pathname.split('/').pop();
  if (!type) {
    // 400 Bad Request if record type is not provided
    throw new ApiError(StatusCode.badrequest, 'Record type is required!');
  }

  if (!RecordsEnum.includes(type)) {
    // 400 Bad Request if record type is invalid
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
      /**
       * A boolean to indicate if the request was successful
       * @type {boolean}
       */
      success: true,
      /**
       * A message to describe the response
       * @type {string}
       */
      message: 'Records Fetched successfully',
      /**
       * The records data
       * @type {Record[]}
       */
      data: records,
    },
    // 200 OK response
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
