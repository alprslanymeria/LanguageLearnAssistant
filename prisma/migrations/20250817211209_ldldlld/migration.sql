BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] DROP CONSTRAINT [FlashcardOldSession_categoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] DROP CONSTRAINT [FlashcardOldSession_flashcardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningOldSession] DROP CONSTRAINT [ListeningOldSession_filmId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningOldSession] DROP CONSTRAINT [ListeningOldSession_listeningId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingOldSession] DROP CONSTRAINT [ReadingOldSession_bookId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingOldSession] DROP CONSTRAINT [ReadingOldSession_readingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingOldSession] DROP CONSTRAINT [WritingOldSession_bookId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingOldSession] DROP CONSTRAINT [WritingOldSession_writingId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_flashcardId_fkey] FOREIGN KEY ([flashcardId]) REFERENCES [dbo].[Flashcard]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[FlashcardCategory]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_filmId_fkey] FOREIGN KEY ([filmId]) REFERENCES [dbo].[ListeningFilm]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_writingId_fkey] FOREIGN KEY ([writingId]) REFERENCES [dbo].[Writing]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[WritingBook]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_readingId_fkey] FOREIGN KEY ([readingId]) REFERENCES [dbo].[Reading]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[ReadingBook]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
