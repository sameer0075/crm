/*
  Warnings:

  - You are about to drop the column `name` on the `records` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "records" DROP COLUMN "name",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "company_linkedin_url" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "linkedin_profile" TEXT,
ADD COLUMN     "state" TEXT;
