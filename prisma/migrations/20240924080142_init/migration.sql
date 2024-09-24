/*
  Warnings:

  - You are about to drop the column `status` on the `comments` table. All the data in the column will be lost.
  - Added the required column `recordStatusId` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_status_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "records" ADD COLUMN     "recordStatusId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
