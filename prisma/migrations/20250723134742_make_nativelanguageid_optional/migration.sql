BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_nativeLanguageId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [nativeLanguageId] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_nativeLanguageId_fkey] FOREIGN KEY ([nativeLanguageId]) REFERENCES [dbo].[Language]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
