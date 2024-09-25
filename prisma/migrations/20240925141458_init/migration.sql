/*
  Warnings:

  - Added the required column `lastName` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "statusCode" SERIAL NOT NULL;
