-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" UUID NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_smtp_settings" (
    "id" UUID NOT NULL,
    "email_name" TEXT NOT NULL,
    "email_from" TEXT NOT NULL,
    "email_password" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "user_smtp_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "key" TEXT,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_status" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "statusFor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusCode" SERIAL NOT NULL,

    CONSTRAINT "record_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUpSettings" (
    "id" UUID NOT NULL,
    "round" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "FollowUpSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "recordId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "autoNumber" SERIAL NOT NULL,
    "statusCode" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "title" TEXT,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "recordStatusId" UUID NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT,
    "lead_source" TEXT NOT NULL DEFAULT 'EMAIL',
    "stage" TEXT,
    "date" TIMESTAMP(3),
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "company_linkedin_url" TEXT,
    "linkedin_profile" TEXT,
    "lastContacted" TIMESTAMP(3),
    "visibleAfter" TIMESTAMP(3),
    "round" INTEGER,
    "userId" UUID NOT NULL,
    "is_active" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "openPhoneType" TEXT,
    "logType" TEXT NOT NULL,
    "recordId" UUID,
    "emailText" TEXT,
    "openphoneId" TEXT,
    "openPhoneVersion" TEXT,
    "eventCreation" TIMESTAMP(3),
    "messageCallId" TEXT,
    "callDuration" TEXT,
    "from" TEXT,
    "to" TEXT,
    "direction" TEXT,
    "status" TEXT,
    "openPhoneUserId" TEXT,
    "phoneNumberId" TEXT,
    "conversationId" TEXT,
    "body" TEXT,
    "media" JSONB,
    "audio" JSONB,
    "userId" UUID,
    "eventPayload" JSONB,
    "notFoundText" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "failed_activity_logs" (
    "id" UUID NOT NULL,
    "failMessage" TEXT NOT NULL,
    "openPhonePayload" JSONB NOT NULL,

    CONSTRAINT "failed_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_smtp_settings_userId_key" ON "user_smtp_settings"("userId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_smtp_settings" ADD CONSTRAINT "user_smtp_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
