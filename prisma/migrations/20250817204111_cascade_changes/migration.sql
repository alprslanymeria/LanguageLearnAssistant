BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[DeckWord] DROP CONSTRAINT [DeckWord_categoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Flashcard] DROP CONSTRAINT [Flashcard_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardCategory] DROP CONSTRAINT [FlashcardCategory_flashcardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] DROP CONSTRAINT [FlashcardOldSession_flashcardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[FlashcardSessionRow] DROP CONSTRAINT [FlashcardSessionRow_oldSessionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Listening] DROP CONSTRAINT [Listening_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningFilm] DROP CONSTRAINT [ListeningFilm_listeningId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningOldSession] DROP CONSTRAINT [ListeningOldSession_listeningId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningSessionRow] DROP CONSTRAINT [ListeningSessionRow_oldSessionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[LiveSession] DROP CONSTRAINT [LiveSession_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Reading] DROP CONSTRAINT [Reading_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingBook] DROP CONSTRAINT [ReadingBook_readingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingOldSession] DROP CONSTRAINT [ReadingOldSession_readingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ReadingSessionRow] DROP CONSTRAINT [ReadingSessionRow_oldSessionId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Writing] DROP CONSTRAINT [Writing_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingBook] DROP CONSTRAINT [WritingBook_writingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingOldSession] DROP CONSTRAINT [WritingOldSession_writingId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[WritingSessionRow] DROP CONSTRAINT [WritingSessionRow_oldSessionId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[LiveSession] ADD CONSTRAINT [LiveSession_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Flashcard] ADD CONSTRAINT [Flashcard_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_flashcardId_fkey] FOREIGN KEY ([flashcardId]) REFERENCES [dbo].[Flashcard]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_flashcardId_fkey] FOREIGN KEY ([flashcardId]) REFERENCES [dbo].[Flashcard]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DeckWord] ADD CONSTRAINT [DeckWord_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[FlashcardCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardSessionRow] ADD CONSTRAINT [FlashcardSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[FlashcardOldSession]([oldSessionId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Listening] ADD CONSTRAINT [Listening_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningFilm] ADD CONSTRAINT [ListeningFilm_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningSessionRow] ADD CONSTRAINT [ListeningSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[ListeningOldSession]([oldSessionId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Writing] ADD CONSTRAINT [Writing_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingBook] ADD CONSTRAINT [WritingBook_writingId_fkey] FOREIGN KEY ([writingId]) REFERENCES [dbo].[Writing]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_writingId_fkey] FOREIGN KEY ([writingId]) REFERENCES [dbo].[Writing]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingSessionRow] ADD CONSTRAINT [WritingSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[WritingOldSession]([oldSessionId]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reading] ADD CONSTRAINT [Reading_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingBook] ADD CONSTRAINT [ReadingBook_readingId_fkey] FOREIGN KEY ([readingId]) REFERENCES [dbo].[Reading]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_readingId_fkey] FOREIGN KEY ([readingId]) REFERENCES [dbo].[Reading]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingSessionRow] ADD CONSTRAINT [ReadingSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[ReadingOldSession]([oldSessionId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
