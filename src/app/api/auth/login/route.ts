import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { StatusCode } from '@/utils/enums';
import { loginSchema } from '@/utils/schemas/auth.schema';
import { removeSensitiveFields } from '@/utils/helper-functions';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

const loginHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { email, password } = loginSchema.parse(body);

  let user = await prisma.user.findFirst({
    where: { email },
    include: {
      role: {
        select: {
          key: true,
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(StatusCode.unauthorized, 'Invalid email or password.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(StatusCode.unauthorized, 'Invalid email or password.');
  }

  // Remove sensitive fields
  user = removeSensitiveFields(user, 'password');

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new ApiError(
      StatusCode.internalservererror,
      'JWT_SECRET is not defined.'
    );
  }

  const token = jwt.sign({ id: user.id, role: user?.role?.key }, jwtSecret, {
    expiresIn: '24h',
  });

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
