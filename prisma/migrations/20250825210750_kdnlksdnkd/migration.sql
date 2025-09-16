/*
  Warnings:

  - You are about to drop the column `filmId` on the `ListeningOldSession` table. All the data in the column will be lost.
  - You are about to drop the `ListeningFilm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `ListeningOldSession` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ListeningFilm] DROP CONSTRAINT [ListeningFilm_listeningId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ListeningOldSession] DROP CONSTRAINT [ListeningOldSession_filmId_fkey];

-- AlterTable
ALTER TABLE [dbo].[ListeningOldSession] DROP COLUMN [filmId];
ALTER TABLE [dbo].[ListeningOldSession] ADD [categoryId] INT NOT NULL;

-- DropTable
DROP TABLE [dbo].[ListeningFilm];

-- CreateTable
CREATE TABLE [dbo].[ListeningCategory] (
    [id] INT NOT NULL IDENTITY(1,1),
    [listeningId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ListeningCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DeckVideo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [categoryId] INT NOT NULL,
    [correct] NVARCHAR(1000) NOT NULL,
    [guess] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [DeckVideo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ListeningCategory] ADD CONSTRAINT [ListeningCategory_listeningId_fkey] FOREIGN KEY ([listeningId]) REFERENCES [dbo].[Listening]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ListeningOldSession] ADD CONSTRAINT [ListeningOldSession_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[ListeningCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DeckVideo] ADD CONSTRAINT [DeckVideo_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[ListeningCategory]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
