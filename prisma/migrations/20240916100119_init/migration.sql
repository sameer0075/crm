-- DropForeignKey
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_recordId_fkey";

-- AlterTable
ALTER TABLE "activity_logs" ADD COLUMN     "notFoundText" TEXT,
ALTER COLUMN "recordId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
