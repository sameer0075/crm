/*
  Warnings:

  - Added the required column `status` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "status",
ADD COLUMN     "status" UUID NOT NULL;

-- CreateTable
CREATE TABLE "record_status" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "statusFor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusCode" SERIAL NOT NULL,

    CONSTRAINT "record_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_status_fkey" FOREIGN KEY ("status") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
