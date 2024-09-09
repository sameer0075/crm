import { NextResponse, NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { errorHanlderEnum } from '@/utils/enums';

/**
 * The global error handler function that wraps any API handler and logs
 * and returns any errors that occur.
 *
 * @param {Function} handler - The API handler to wrap with error handling
 * @returns {Function} - The wrapped API handler with error handling
 */
export const globalErrorHandler =
  (handler: (req: NextRequest) => Promise<NextResponse>) =>
  async (req: NextRequest) => {
    try {
      // Call the handler and return the response
      return await handler(req);
    } catch (error) {
      // If it's an ApiError, it has a statusCode and a message
      if (error instanceof ApiError) {
        const ErrorPayload = errorHanlderEnum(req, error);
        // Return the error with the correct status code
        return NextResponse.json(ErrorPayload, { status: error.statusCode });
      } else {
        // Log server errors using your preferred logger
        console.error(error);
        const ErrorPayload = errorHanlderEnum(req, error);
        // Return the error with the correct status code
        return NextResponse.json(ErrorPayload, { status: ErrorPayload.status });
      }
    }
  };
