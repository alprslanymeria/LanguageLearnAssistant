BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [userId] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000),
    [defaultLanguageId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Language] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [imageUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Language_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Practice] (
    [id] INT NOT NULL IDENTITY(1,1),
    [languageId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Practice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LiveSession] (
    [liveSessionId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [LiveSession_pkey] PRIMARY KEY CLUSTERED ([liveSessionId]),
    CONSTRAINT [LiveSession_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Flashcard] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    CONSTRAINT [Flashcard_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FlashcardCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [flashcardId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [FlashcardCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FlashcardOldSession] (
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [flashcardId] INT NOT NULL,
    [categoryId] INT NOT NULL,
    [rate] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FlashcardOldSession_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [FlashcardOldSession_pkey] PRIMARY KEY CLUSTERED ([oldSessionId])
);

-- CreateTable
CREATE TABLE [dbo].[DeckWord] (
    [id] INT NOT NULL IDENTITY(1,1),
    [categoryId] INT NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DeckWord_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FlashcardSessionRow] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [question] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [status] BIT NOT NULL,
    CONSTRAINT [FlashcardSessionRow_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Listening] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    CONSTRAINT [Listening_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ListeningFilm] (
    [id] INT NOT NULL IDENTITY(1,1),
    [listeningId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [imageUrl] NVARCHAR(1000) NOT NULL,
    [sourceUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ListeningFilm_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ListeningOldSession] (
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [listeningId] INT NOT NULL,
    [filmId] INT NOT NULL,
    [rate] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ListeningOldSession_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ListeningOldSession_pkey] PRIMARY KEY CLUSTERED ([oldSessionId])
);

-- CreateTable
CREATE TABLE [dbo].[ListeningSessionRow] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [listenedSentence] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [similarity] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [ListeningSessionRow_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Writing] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    CONSTRAINT [Writing_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WritingBook] (
    [id] INT NOT NULL IDENTITY(1,1),
    [writingId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [imageUrl] NVARCHAR(1000) NOT NULL,
    [leftColor] NVARCHAR(1000) NOT NULL,
    [sourceUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [WritingBook_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WritingOldSession] (
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [writingId] INT NOT NULL,
    [bookId] INT NOT NULL,
    [rate] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [WritingOldSession_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [WritingOldSession_pkey] PRIMARY KEY CLUSTERED ([oldSessionId])
);

-- CreateTable
CREATE TABLE [dbo].[WritingSessionRow] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [selectedSentence] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [answerTranslate] NVARCHAR(1000) NOT NULL,
    [similarity] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [WritingSessionRow_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reading] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [languageId] INT NOT NULL,
    [practiceId] INT NOT NULL,
    CONSTRAINT [Reading_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ReadingBook] (
    [id] INT NOT NULL IDENTITY(1,1),
    [readingId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [imageUrl] NVARCHAR(1000) NOT NULL,
    [leftColor] NVARCHAR(1000) NOT NULL,
    [sourceUrl] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ReadingBook_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ReadingOldSession] (
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [readingId] INT NOT NULL,
    [bookId] INT NOT NULL,
    [rate] DECIMAL(32,16) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ReadingOldSession_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ReadingOldSession_pkey] PRIMARY KEY CLUSTERED ([oldSessionId])
);

-- CreateTable
CREATE TABLE [dbo].[ReadingSessionRow] (
    [id] INT NOT NULL IDENTITY(1,1),
    [oldSessionId] NVARCHAR(1000) NOT NULL,
    [selectedSentence] NVARCHAR(1000) NOT NULL,
    [answer] NVARCHAR(1000) NOT NULL,
    [answerTranslate] NVARCHAR(1000) NOT NULL,
    [similarity] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [ReadingSessionRow_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Practice] ADD CONSTRAINT [Practice_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LiveSession] ADD CONSTRAINT [LiveSession_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Flashcard] ADD CONSTRAINT [Flashcard_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Flashcard] ADD CONSTRAINT [Flashcard_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Flashcard] ADD CONSTRAINT [Flashcard_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardCategory] ADD CONSTRAINT [FlashcardCategory_flashcardId_fkey] FOREIGN KEY ([flashcardId]) REFERENCES [dbo].[Flashcard]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_flashcardId_fkey] FOREIGN KEY ([flashcardId]) REFERENCES [dbo].[Flashcard]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardOldSession] ADD CONSTRAINT [FlashcardOldSession_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[FlashcardCategory]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[DeckWord] ADD CONSTRAINT [DeckWord_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[FlashcardCategory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FlashcardSessionRow] ADD CONSTRAINT [FlashcardSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[FlashcardOldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Listening] ADD CONSTRAINT [Listening_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Listening] ADD CONSTRAINT [Listening_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Listening] ADD CONSTRAINT [Listening_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningFilm] ADD CONSTRAINT [ListeningFilm_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_filmId_fkey] FOREIGN KEY ([filmId]) REFERENCES [dbo].[ListeningFilm]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningSessionRow] ADD CONSTRAINT [ListeningSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[ListeningOldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Writing] ADD CONSTRAINT [Writing_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Writing] ADD CONSTRAINT [Writing_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Writing] ADD CONSTRAINT [Writing_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[WritingBook] ADD CONSTRAINT [WritingBook_writingId_fkey] FOREIGN KEY ([writingId]) REFERENCES [dbo].[Writing]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_writingId_fkey] FOREIGN KEY ([writingId]) REFERENCES [dbo].[Writing]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WritingOldSession] ADD CONSTRAINT [WritingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[WritingBook]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[WritingSessionRow] ADD CONSTRAINT [WritingSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[WritingOldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reading] ADD CONSTRAINT [Reading_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([userId]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reading] ADD CONSTRAINT [Reading_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reading] ADD CONSTRAINT [Reading_practiceId_fkey] FOREIGN KEY ([practiceId]) REFERENCES [dbo].[Practice]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingBook] ADD CONSTRAINT [ReadingBook_readingId_fkey] FOREIGN KEY ([readingId]) REFERENCES [dbo].[Reading]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_readingId_fkey] FOREIGN KEY ([readingId]) REFERENCES [dbo].[Reading]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingOldSession] ADD CONSTRAINT [ReadingOldSession_bookId_fkey] FOREIGN KEY ([bookId]) REFERENCES [dbo].[ReadingBook]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReadingSessionRow] ADD CONSTRAINT [ReadingSessionRow_oldSessionId_fkey] FOREIGN KEY ([oldSessionId]) REFERENCES [dbo].[ReadingOldSession]([oldSessionId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
