import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { loginSchema } from '@/utils/schemas/auth.schema';

const prisma = new PrismaClient();

const loginHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { email, password } = loginSchema.parse(body);

  // Find the user by email
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new ApiError(StatusCode.unauthorized, 'Invalid email or password');
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(StatusCode.unauthorized, 'Invalid email or password');
  }

  /// Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new ApiError(
      StatusCode.internalservererror,
      'JWT_SECRET is not defined'
    );
  }

  // Generate and return a JWT token
  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

  return NextResponse.json(
    {
      success: true,
      message: 'Login successful',
      user,
      token,
    },
    { status: StatusCode.success }
  );
};

export const POST = globalErrorHandler(loginHandler);
