/*
  Warnings:

  - Made the column `company` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `records` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "records" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "lead_source" SET DEFAULT 'EMAIL';
