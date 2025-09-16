/*
  Warnings:

  - A unique constraint covering the columns `[languageId,name]` on the table `Practice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,languageId,practiceId]` on the table `Reading` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_languageId_name_key] UNIQUE NONCLUSTERED ([languageId], [name]);

-- CreateIndex
ALTER TABLE [dbo].[Reading] ADD CONSTRAINT [Reading_userId_languageId_practiceId_key] UNIQUE NONCLUSTERED ([userId], [languageId], [practiceId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
