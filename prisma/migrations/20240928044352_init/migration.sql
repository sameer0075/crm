-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_recordStatusId_fkey";

-- DropForeignKey
ALTER TABLE "records" DROP CONSTRAINT "records_userId_fkey";

-- AlterTable
ALTER TABLE "records" ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "recordStatusId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
