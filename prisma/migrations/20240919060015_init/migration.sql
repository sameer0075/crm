/*
  Warnings:

  - You are about to drop the `email_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `openphone_message_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `openphone_phone_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "email_log" DROP CONSTRAINT "email_log_logId_fkey";

-- DropForeignKey
ALTER TABLE "openphone_message_log" DROP CONSTRAINT "openphone_message_log_logId_fkey";

-- DropForeignKey
ALTER TABLE "openphone_phone_log" DROP CONSTRAINT "openphone_phone_log_logId_fkey";

-- DropIndex
DROP INDEX "activity_logs_recordId_logType_key";

-- DropIndex
DROP INDEX "activity_logs_type_recordId_idx";

-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "body" TEXT,
ADD COLUMN     "conversationId" TEXT,
ADD COLUMN     "direction" TEXT,
ADD COLUMN     "emailText" TEXT,
ADD COLUMN     "eventCreation" TIMESTAMP(3),
ADD COLUMN     "from" TEXT,
ADD COLUMN     "media" JSONB,
ADD COLUMN     "messageCallId" TEXT,
ADD COLUMN     "openPhoneUserId" TEXT,
ADD COLUMN     "openPhoneVersion" TEXT,
ADD COLUMN     "openphoneId" TEXT,
ADD COLUMN     "phoneNumberId" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "to" TEXT;

-- DropTable
DROP TABLE "email_log";

-- DropTable
DROP TABLE "openphone_message_log";

-- DropTable
DROP TABLE "openphone_phone_log";
