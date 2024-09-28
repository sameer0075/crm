import { NextResponse, NextRequest } from 'next/server';

import { ApiError } from 'next/dist/server/api-utils';
import { globalErrorHandler } from '@/lib/error-handling/error-handler';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from '@/utils/enums';
import { composeMiddlewares } from '@/lib/middleware/middleware-composer';
import { jwtMiddleware } from '@/lib/middleware/auth-middleware';
import prisma from '@/lib/prisma'; // Import your Prisma client singleton

type WhereType = {
  type: string;
  is_active: boolean;
  userId?: string;
  createdAt?: Date | string;
};

type LogsWhere = {
  userId?: string;
  type?: string;
  createdAt?: Date | string;
};

interface ResponseData {
  title: string;
  type: string;
  value: number | string;
}

const DashboardStatsHandler = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    const {
      startDate = null,
      endDate = null,
      userId = null,
    } = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        id: req.userId,
      },
      include: {
        role: true,
      },
    });

    const leadsWhere: WhereType = {
      type: 'LEAD',
      is_active: true,
    };

    const logsWhere: LogsWhere = {};

    if (user && user.role) {
      // For Admin Case
      if (user.role.name === 'ADMIN') {
        if (userId) {
          leadsWhere['userId'] = userId;
          logsWhere['userId'] = userId;
        }

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          leadsWhere['createdAt'] = { gte: start, lte: end };
          logsWhere['createdAt'] = { gte: start, lte: end };
        }
      } else {
        // Non-admin users can only fetch data for themselves
        leadsWhere['userId'] = req.userId;
        logsWhere['userId'] = req.userId;

        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          leadsWhere['createdAt'] = { gte: start, lte: end };
          logsWhere['createdAt'] = { gte: start, lte: end };
        }
      }
    }

    const newLeadsCount = await prisma.records.count({
      where: leadsWhere,
    });

    leadsWhere.type = 'OPPORTUNITY';
    const opportunitiesCount = await prisma.records.count({
      where: leadsWhere,
    });

    leadsWhere.type = 'FOLLOW_UP_OPPORTUNITY';
    const followUpOpportunitiesCount = await prisma.records.count({
      where: leadsWhere,
    });

    leadsWhere.type = 'APPOINTMENT';
    const appointmentsCount = await prisma.records.count({
      where: leadsWhere,
    });

    leadsWhere.type = 'DEALS';
    const dealsCount = await prisma.records.count({
      where: leadsWhere,
    });

    const totalLogsCount = await prisma.activity_logs.count({
      where: logsWhere,
    });

    logsWhere.type = 'call';
    const totalPhoneLogsCount = await prisma.activity_logs.count({
      where: logsWhere,
    });

    logsWhere.type = 'email';
    const totalMailLogsCount = await prisma.activity_logs.count({
      where: logsWhere,
    });

    logsWhere.type = 'comment';
    const totalCommentLogsCount = await prisma.activity_logs.count({
      where: logsWhere,
    });

    const data: ResponseData[] = [
      {
        title: 'New Leads',
        type: 'LEAD',
        value: newLeadsCount,
      },
      {
        title: 'New Opportunities',
        type: 'OPPORTUNITY',
        value: opportunitiesCount,
      },
      {
        title: 'Follow Up Opportunities',
        type: 'FOLLOW_UP_OPPORTUNITY',
        value: followUpOpportunitiesCount,
      },
      {
        title: 'New Appointments',
        type: 'APPOINTMENTS',
        value: appointmentsCount,
      },
      {
        title: 'New Deals',
        type: 'DEALS',
        value: dealsCount,
      },
      {
        title: 'All Logs',
        type: 'ALL_LOGS',
        value: totalLogsCount,
      },
      {
        title: 'Phone Logs',
        type: 'PHONE_LOGS',
        value: totalPhoneLogsCount,
      },
      {
        title: 'Mail Logs',
        type: 'MAIL_LOGS',
        value: totalMailLogsCount,
      },
      {
        title: 'Comment Logs',
        type: 'COMMENT_LOGS',
        value: totalCommentLogsCount,
      },
    ];

    return NextResponse.json(
      {
        success: true,
        message: 'Dashboard Data Fetched successfully',
        data,
      },
      { status: StatusCode.success }
    );
  } catch (error) {
    console.log('error', error);
    throw new ApiError(StatusCode.badrequest, error.message);
  }
};

// Compose and apply middlewares
const composedMiddleware = composeMiddlewares(jwtMiddleware);

export const POST = async (req: NextRequest) => {
  // Apply composed middleware
  const middlewareResponse = await composedMiddleware(req);
  if (middlewareResponse) {
    return middlewareResponse;
  }

  // Call the main handler
  return globalErrorHandler(DashboardStatsHandler)(req);
};
