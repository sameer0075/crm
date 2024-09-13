// src/lib/middleware/jwt-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { RoleEnums, StatusCode } from '@/utils/enums';

const secretKey = process.env.JWT_SECRET || 'NO_SECRET';

// Define a function to check if a user has the required role
const hasRequiredRole = (role: string): boolean => {
  return role === RoleEnums.ADMIN;
};

export const RoleGuard = async (
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
    // Verify the JWT token and extract the payload
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // Extract user role from the decoded payload
    const userRole = decoded.role;

    // Check if the user's role is authorized for this request
    if (!userRole || !hasRequiredRole(userRole)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Forbidden: Insufficient role permissions',
        }),
        { status: StatusCode.unauthorized } // Use forbidden status for insufficient permissions
      );
    }

    // Proceed with the request if role is valid
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: StatusCode.unauthorized }
    );
  }
};
