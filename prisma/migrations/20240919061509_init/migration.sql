-- CreateTable
CREATE TABLE "failed_activity_logs" (
    "id" UUID NOT NULL,
    "failMessage" TEXT NOT NULL,
    "openPhonePayload" JSONB NOT NULL,

    CONSTRAINT "failed_activity_logs_pkey" PRIMARY KEY ("id")
);
