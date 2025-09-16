BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] DROP CONSTRAINT [FlashcardOldSession_categoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningOldSession] DROP CONSTRAINT [ListeningOldSession_filmId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingOldSession] DROP CONSTRAINT [ReadingOldSession_bookId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingOldSession] DROP CONSTRAINT [WritingOldSession_bookId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[FlashcardCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_filmId_fkey] FOREIGN KEY ([filmId]) REFERENCES [dbo].[ListeningFilm]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[WritingBook]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[ReadingBook]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
