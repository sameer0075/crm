/*
  Warnings:

  - You are about to drop the column `callConversationId` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callDirection` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callFrom` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callId` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callPhoneNumberId` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callStatus` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callTo` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `callUserId` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `emailText` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `eventCreation` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `event_type` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `is_openphone_log` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `openPhoneJson` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `openPhoneVersion` on the `activity_logs` table. All the data in the column will be lost.
  - You are about to drop the column `openphoneId` on the `activity_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activity_logs" DROP COLUMN "callConversationId",
DROP COLUMN "callDirection",
DROP COLUMN "callFrom",
DROP COLUMN "callId",
DROP COLUMN "callPhoneNumberId",
DROP COLUMN "callStatus",
DROP COLUMN "callTo",
DROP COLUMN "callUserId",
DROP COLUMN "emailText",
DROP COLUMN "eventCreation",
DROP COLUMN "event_type",
DROP COLUMN "is_openphone_log",
DROP COLUMN "openPhoneJson",
DROP COLUMN "openPhoneVersion",
DROP COLUMN "openphoneId",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "email_log" (
    "id" UUID NOT NULL,
    "emailText" TEXT NOT NULL,
    "logId" UUID NOT NULL,

    CONSTRAINT "email_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "openphone_phone_log" (
    "id" UUID NOT NULL,
    "openphoneId" TEXT NOT NULL,
    "openPhoneVersion" TEXT NOT NULL,
    "eventCreation" TIMESTAMP(3) NOT NULL,
    "callId" TEXT NOT NULL,
    "callFrom" TEXT NOT NULL,
    "callTo" TEXT NOT NULL,
    "callDirection" TEXT NOT NULL,
    "callStatus" TEXT NOT NULL,
    "callUserId" TEXT NOT NULL,
    "callPhoneNumberId" TEXT NOT NULL,
    "callConversationId" TEXT NOT NULL,
    "openPhoneJson" JSONB NOT NULL,
    "logId" UUID NOT NULL,

    CONSTRAINT "openphone_phone_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activity_logs_type_recordId_idx" ON "activity_logs"("type", "recordId");

-- AddForeignKey
ALTER TABLE "email_log" ADD CONSTRAINT "email_log_logId_fkey" FOREIGN KEY ("logId") REFERENCES "activity_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "openphone_phone_log" ADD CONSTRAINT "openphone_phone_log_logId_fkey" FOREIGN KEY ("logId") REFERENCES "activity_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
