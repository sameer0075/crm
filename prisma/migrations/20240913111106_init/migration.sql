-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "recordId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
