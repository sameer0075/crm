/*
  Warnings:

  - Added the required column `logType` to the `activity_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "logType" TEXT NOT NULL;
