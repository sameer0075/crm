/*
  Warnings:

  - You are about to drop the column `lastName` on the `records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "records" DROP COLUMN "lastName",
ADD COLUMN     "autoNumber" SERIAL;
