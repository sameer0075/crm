-- AlterTable
ALTER TABLE "records" ADD COLUMN     "lastContacted" TIMESTAMP(3),
ADD COLUMN     "round" INTEGER,
ADD COLUMN     "visibleAfter" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "FollowUpSettings" (
    "id" SERIAL NOT NULL,
    "round" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "FollowUpSettings_pkey" PRIMARY KEY ("id")
);
