import { openPhoneMiddleware } from '@/lib/middleware/openphone-middleware';
import { StatusCode } from '@/utils/enums';
import { PrismaClient } from '@prisma/client';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

const CreateActivityLog = async (req: NextRequest, event, recordId: string) => {
  const middlewareResponse = await openPhoneMiddleware(req, event);
  if (middlewareResponse) {
    throw new ApiError(
      StatusCode.badrequest,
      'Openphone Signature Verification Failed'
    );
  }

  const type = event.data.object.object;
  const activityLog = {
    type,
    logType: 'LEAD',
    record: {
      connect: {
        id: recordId,
      },
    },
  };

  let log;
  const foundLog = await prisma.activity_logs.findFirst({
    where: {
      recordId: recordId,
      logType: 'LEAD',
    },
  });

  if (foundLog) {
    log = foundLog;
  } else {
    log = await prisma.activity_logs.create({ data: activityLog });
  }

  return log;
};

const CreateEmptyACtivityLog = async (event) => {
  const type = event.data.object.object;
  const activityLog = {
    type,
    notFoundText: `${event.data.object.to} wasn't found in our database! Kindly add this record into your system!`,
    logType: 'LEAD',
  };

  return await prisma.activity_logs.create({
    data: activityLog,
  });
};

export { CreateActivityLog, CreateEmptyACtivityLog };
