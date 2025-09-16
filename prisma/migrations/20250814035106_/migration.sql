/*
  Warnings:

  - A unique constraint covering the columns `[userId,languageId,practiceId]` on the table `Listening` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Listening] ADD CONSTRAINT [Listening_userId_languageId_practiceId_key] UNIQUE NONCLUSTERED ([userId], [languageId], [practiceId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
