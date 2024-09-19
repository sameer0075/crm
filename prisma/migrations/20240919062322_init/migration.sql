/*
  Warnings:

  - Added the required column `openPhoneType` to the `activity_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "openPhoneType" TEXT NOT NULL;
