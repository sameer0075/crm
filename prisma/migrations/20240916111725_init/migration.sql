/*
  Warnings:

  - A unique constraint covering the columns `[recordId,logType]` on the table `activity_logs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activity_logs_recordId_logType_key" ON "activity_logs"("recordId", "logType");
