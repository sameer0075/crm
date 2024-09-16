-- CreateTable
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "recordId" UUID NOT NULL,
    "event_type" TEXT NOT NULL,
    "openphoneId" TEXT NOT NULL,
    "openPhoneVersion" TEXT NOT NULL,
    "eventCreation" TIMESTAMP(3) NOT NULL,
    "callId" TEXT NOT NULL,
    "callFrom" TEXT NOT NULL,
    "callTo" TEXT NOT NULL,
    "callDirection" TEXT NOT NULL,
    "callStatus" TEXT NOT NULL,
    "callUserId" TEXT NOT NULL,
    "callPhoneNumberId" TEXT NOT NULL,
    "callConversationId" TEXT NOT NULL,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
