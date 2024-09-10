// src/lib/middleware/middleware-composer.ts
import { NextRequest, NextResponse } from 'next/server';

export const composeMiddlewares = (
  ...middlewares: Array<(req: NextRequest) => Promise<NextResponse | void>>
) => {
  return async (req: NextRequest): Promise<NextResponse | void> => {
    for (const middleware of middlewares) {
      const result = await middleware(req);
      if (result) {
        return result;
      }
    }
  };
};
