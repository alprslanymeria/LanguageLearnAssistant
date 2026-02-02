import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { IContainerModule } from "@/src/di/IContainerModule"
import { TYPES } from "@/src/di/type"
import { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { UserRepository } from "@/src/infrastructure/persistence/repositories/UserRepository"
import { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import { LanguageRepository } from "@/src/infrastructure/persistence/repositories/LanguageRepository"
import { DeckWordRepository } from "@/src/infrastructure/persistence/repositories/DeckWordRepository"
import { FlashcardCategoryRepository } from "@/src/infrastructure/persistence/repositories/FlashcardCategoryRepository"
import { FlashcardOldSessionRepository } from "@/src/infrastructure/persistence/repositories/FlashcardOldSessionRepository"
import { FlashcardSessionRowRepository } from "@/src/infrastructure/persistence/repositories/FlashcardSessionRowRepository"
import { ListeningCategoryRepository } from "@/src/infrastructure/persistence/repositories/ListeningCategoryRepository"
import { ListeningOldSessionRepository } from "@/src/infrastructure/persistence/repositories/ListeningOldSessionRepository"
import { ListeningRepository } from "@/src/infrastructure/persistence/repositories/ListeningRepository"
import { ListeningSessionRowRepository } from "@/src/infrastructure/persistence/repositories/ListeningSessionRowRepository"
import { PracticeRepository } from "@/src/infrastructure/persistence/repositories/PracticeRepository"
import { ReadingBookRepository } from "@/src/infrastructure/persistence/repositories/ReadingBookRepository"
import { ReadingOldSessionRepository } from "@/src/infrastructure/persistence/repositories/ReadingOldSessionRepository"
import { ReadingRepository } from "@/src/infrastructure/persistence/repositories/ReadingRepository"
import { ReadingSessionRowRepository } from "@/src/infrastructure/persistence/repositories/ReadingSessionRowRepository"
import { WritingBookRepository } from "@/src/infrastructure/persistence/repositories/WritingBookRepository"
import { WritingOldSessionRepository } from "@/src/infrastructure/persistence/repositories/WritingOldSessionRepository"
import { WritingRepository } from "@/src/infrastructure/persistence/repositories/WritingRepository"
import { WritingSessionRowRepository } from "@/src/infrastructure/persistence/repositories/WritingSessionRowRepository"
import { FlashcardRepository } from "@/src/infrastructure/persistence/repositories/FlashcardRepository"
import { DeckVideoRepository } from '@/src/infrastructure/persistence/repositories/DeckVideoRepository'

export class RepositoryModule implements IContainerModule {

    register(container: Container): void {

        container.bind<DeckWordRepository>(TYPES.DeckWordRepository).to(DeckWordRepository)
        container.bind<DeckVideoRepository>(TYPES.DeckVideoRepository).to(DeckVideoRepository)
        container.bind<FlashcardCategoryRepository>(TYPES.FlashcardCategoryRepository).to(FlashcardCategoryRepository)
        container.bind<FlashcardOldSessionRepository>(TYPES.FlashcardOldSessionRepository).to(FlashcardOldSessionRepository)
        container.bind<FlashcardRepository>(TYPES.FlashcardRepository).to(FlashcardRepository)
        container.bind<FlashcardSessionRowRepository>(TYPES.FlashcardSessionRowRepository).to(FlashcardSessionRowRepository)
        container.bind<ILanguageRepository>(TYPES.LanguageRepository).to(LanguageRepository)
        container.bind<ListeningCategoryRepository>(TYPES.ListeningCategoryRepository).to(ListeningCategoryRepository)
        container.bind<ListeningOldSessionRepository>(TYPES.ListeningOldSessionRepository).to(ListeningOldSessionRepository)
        container.bind<ListeningRepository>(TYPES.ListeningRepository).to(ListeningRepository)
        container.bind<ListeningSessionRowRepository>(TYPES.ListeningSessionRowRepository).to(ListeningSessionRowRepository)
        container.bind<PracticeRepository>(TYPES.PracticeRepository).to(PracticeRepository)
        container.bind<ReadingBookRepository>(TYPES.ReadingBookRepository).to(ReadingBookRepository)
        container.bind<ReadingOldSessionRepository>(TYPES.ReadingOldSessionRepository).to(ReadingOldSessionRepository)
        container.bind<ReadingRepository>(TYPES.ReadingRepository).to(ReadingRepository)
        container.bind<ReadingSessionRowRepository>(TYPES.ReadingSessionRowRepository).to(ReadingSessionRowRepository)
        container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
        container.bind<WritingBookRepository>(TYPES.WritingBookRepository).to(WritingBookRepository)
        container.bind<WritingOldSessionRepository>(TYPES.WritingOldSessionRepository).to(WritingOldSessionRepository)
        container.bind<WritingRepository>(TYPES.WritingRepository).to(WritingRepository)
        container.bind<WritingSessionRowRepository>(TYPES.WritingSessionRowRepository).to(WritingSessionRowRepository)
    }
}