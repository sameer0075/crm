// src/lib/middleware/jwt-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { StatusCode } from '@/utils/enums';

const secretKey = process.env.JWT_SECRET || 'NO_SECRET';

declare module 'next/server' {
  interface NextRequest {
    userId: string;
  }
}

export const jwtMiddleware = async (
  req: NextRequest
): Promise<NextResponse | void> => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: StatusCode.unauthorized }
    );
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decoded.id;
    req.userId = userId;
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: StatusCode.unauthorized }
    );
  }
};
