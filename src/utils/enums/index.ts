import { NextRequest } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { ZodError } from 'zod';
const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError;
};

const errorHanlderEnum = (req: NextRequest, error?: unknown) => {
  // Determine the status code
  const status = error instanceof ApiError ? error.statusCode : 400;

  // Determine the message
  let message = 'Internal Server Error';

  if (error instanceof ApiError) {
    message = error.message;
  } else if (isZodError(error)) {
    message = error.errors[0]?.message ?? 'Validation error';
  } else if (error instanceof Error) {
    message = error.message;
  }

  // Create the error payload
  const errorPayload = {
    /**
     * A boolean to indicate if there was an error
     * @type {boolean}
     */
    error: true,
    /**
     * The HTTP status code of the error
     * @type {number}
     */
    status: status,
    /**
     * The error message
     * @type {string}
     */
    message: message,
    /**
     * The endpoint that the error occurred on
     * @type {string}
     */
    endpoint: req.url,
    /**
     * The timestamp of the error
     * @type {string}
     */
    timeStamp: new Date().toISOString(),
  };

  return errorPayload;
};

const enum StatusCode {
  success = 201,
  unauthorized = 401,
  badrequest = 400,
  internalservererror = 500,
}

const RecordsEnum = ['LEAD', 'OPPORTUNITY', 'APPOINTMENT', 'DEAL'];

export { errorHanlderEnum, StatusCode, RecordsEnum };
