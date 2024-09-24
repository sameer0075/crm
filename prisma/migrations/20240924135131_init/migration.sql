-- CreateTable
CREATE TABLE "user_smtp_settings" (
    "id" UUID NOT NULL,
    "email_name" TEXT NOT NULL,
    "email_from" TEXT NOT NULL,
    "email_password" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "user_smtp_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_smtp_settings_userId_key" ON "user_smtp_settings"("userId");

-- AddForeignKey
ALTER TABLE "user_smtp_settings" ADD CONSTRAINT "user_smtp_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
