// src/lib/middleware/jwt-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { StatusCode } from '@/utils/enums';

const secretKey = process.env.JWT_SECRET || 'NO_SECRET';

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
    jwt.verify(token, secretKey);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: StatusCode.unauthorized }
    );
  }
};
