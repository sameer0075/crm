-- CreateTable
CREATE TABLE "openphone_message_log" (
    "id" UUID NOT NULL,
    "openphoneId" TEXT NOT NULL,
    "openPhoneVersion" TEXT NOT NULL,
    "eventCreation" TIMESTAMP(3) NOT NULL,
    "messageId" TEXT NOT NULL,
    "messageFrom" TEXT NOT NULL,
    "messageTo" TEXT NOT NULL,
    "messageDirection" TEXT NOT NULL,
    "messageBody" TEXT NOT NULL,
    "messageMedia" JSONB NOT NULL,
    "messageStatus" TEXT NOT NULL,
    "messageUserId" TEXT NOT NULL,
    "messagePhoneNumberId" TEXT NOT NULL,
    "messageConversationId" TEXT NOT NULL,
    "messagePhoneJson" JSONB NOT NULL,
    "logId" UUID NOT NULL,

    CONSTRAINT "openphone_message_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "openphone_message_log" ADD CONSTRAINT "openphone_message_log_logId_fkey" FOREIGN KEY ("logId") REFERENCES "activity_logs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
