import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

const HelloHandler = async () => {
  try {
    return NextResponse.json({
      message: 'Hello from novatore crm',
      status: StatusCode.success,
    });
  } catch (err) {
    throw new ApiError(StatusCode.badrequest, 'Some error.');
  }
};

export const GET = globalErrorHandler(HelloHandler);
