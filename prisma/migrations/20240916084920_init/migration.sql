/*
  Warnings:

  - Added the required column `is_openphone_log` to the `activity_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "emailText" TEXT,
ADD COLUMN     "is_openphone_log" BOOLEAN NOT NULL,
ADD COLUMN     "openPhoneJson" JSONB,
ALTER COLUMN "event_type" DROP NOT NULL,
ALTER COLUMN "openphoneId" DROP NOT NULL,
ALTER COLUMN "openPhoneVersion" DROP NOT NULL,
ALTER COLUMN "eventCreation" DROP NOT NULL,
ALTER COLUMN "callId" DROP NOT NULL,
ALTER COLUMN "callFrom" DROP NOT NULL,
ALTER COLUMN "callTo" DROP NOT NULL,
ALTER COLUMN "callDirection" DROP NOT NULL,
ALTER COLUMN "callStatus" DROP NOT NULL,
ALTER COLUMN "callUserId" DROP NOT NULL,
ALTER COLUMN "callPhoneNumberId" DROP NOT NULL,
ALTER COLUMN "callConversationId" DROP NOT NULL;
