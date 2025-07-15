/*
  Warnings:

  - You are about to drop the column `defaultLanguageId` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_defaultLanguageId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [defaultLanguageId];
ALTER TABLE [dbo].[User] ADD [nativeLanguageId] INT NOT NULL CONSTRAINT [User_nativeLanguageId_df] DEFAULT 2;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_nativeLanguageId_fkey] FOREIGN KEY ([nativeLanguageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
