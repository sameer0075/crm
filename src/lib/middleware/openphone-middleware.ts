// src/lib/middleware/pagination-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { StatusCode } from '@/utils/enums';

export const openPhoneMiddleware = async (
  req: NextRequest,
  body
): Promise<NextResponse | void> => {
  try {
    const headersList = req.headers;
    const signature = headersList.get('openphone-signature');
    const secret = process.env.OPEN_PHONE_SECRET;
    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          message: 'OpenPhone signature not found.',
        },
        { status: StatusCode.badrequest }
      );
    }

    if (!secret) {
      return NextResponse.json(
        {
          success: false,
          message: 'OpenPhone Invalid secret.',
        },
        { status: StatusCode.badrequest }
      );
    }

    const fields = signature.split(';');
    const timestamp = fields[2];
    const providedDigest = fields[3];

    // Compute the data covered by the signature.
    const signedData = timestamp + '.' + JSON.stringify(body);

    // Convert the base64-encoded signing key to binary.
    const signingKeyBinary = Buffer.from(secret, 'base64').toString('binary');

    // Compute the SHA256 HMAC digest.
    // Obtain the digest in base64-encoded form for easy comparison with
    // the digest provided in the openphone-signature header.
    const computedDigest = crypto
      .createHmac('sha256', signingKeyBinary)
      .update(Buffer.from(signedData, 'utf8'))
      .digest('base64');

    // Make sure the computed digest matches the digest in the openphone header.
    if (providedDigest !== computedDigest) {
      return NextResponse.json(
        {
          success: false,
          message: 'OpenPhone Signature verification failed.',
        },
        { status: StatusCode.badrequest }
      );
    }
  } catch (error) {
    console.log('error---', error);
    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: StatusCode.badrequest }
    );
  }
};
