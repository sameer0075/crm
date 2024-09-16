// src/lib/middleware/pagination-middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// Augment NextRequest with pagination properties
declare module 'next/server' {
  interface NextRequest {
    pagination?: {
      skip: number;
      take: number;
    };
  }
}

export const paginationMiddleware = async (
  req: NextRequest
): Promise<NextResponse | void> => {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(
    req.nextUrl.searchParams.get('pageSize') || '5',
    10
  );

  // Validate page and pageSize parameters
  if (page < 1 || pageSize < 1) {
    return NextResponse.json(
      {
        success: false,
        message: 'Page and pageSize must be greater than 0.',
      },
      { status: 400 }
    );
  }

  // Attach pagination parameters to the request
  req.pagination = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
};
