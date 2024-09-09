import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { ApiError } from 'next/dist/server/api-utils';

import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { signupSchema } from '@/utils/schemas/auth.schema';
import { StatusCode } from '@/utils/enums';
import { removeSensitiveFields } from '@/utils/helper-functions';

const prisma = new PrismaClient();

/**
 * The API handler for registering a new user.
 *
 * @param {NextRequest} req - The Next.js request object
 * @returns {Promise<NextResponse>} - The response object with the user information
 */
const signupHandler = async (req: NextRequest): Promise<NextResponse> => {
  const body = await req.json();
  const { name, email, password, roleId } = signupSchema.parse(body);

  // Check if the roleId exists in the role table
  const roleExists = await prisma.role.findFirst({
    where: { id: roleId },
  });

  if (!roleExists) {
    throw new ApiError(StatusCode.badrequest, 'Role does not exists!');
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(StatusCode.badrequest, 'User already exists!');
  }

  // Hash the password if provided
  let hashedPassword = '';
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  // Create the new user
  let newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId,
    },
  });

  newUser = removeSensitiveFields(newUser, 'password');


  return NextResponse.json(
    {
      success: true,
      message: 'User registered successfully',
      user: newUser,
    },
    { status: StatusCode.success }
  );
};

export const POST = globalErrorHandler(signupHandler);
