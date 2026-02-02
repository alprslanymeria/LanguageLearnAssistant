import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { IContainerModule } from "@/src/di/IContainerModule"
import { CommandHandlerRegistry } from "@/src/infrastructure/mediatR/CommandRegistry"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"

// AUTH COMMANDS
import { SignInCommandHandler } from "@/src/actions/Auth/Commands/SignIn/CommandHandler"
import { SIGN_IN_COMMAND } from "@/src/actions/Auth/Commands/SignIn/Command"
import { SignUpCommandHandler } from "@/src/actions/Auth/Commands/SignUp/CommandHandler"
import { SIGN_UP_COMMAND } from "@/src/actions/Auth/Commands/SignUp/Command"

// DECKWORD COMMANDS
import { CREATE_DECK_WORD_COMMAND } from "@/src/actions/DeckWord/Commands/CreateDeckWord/Command"
import { CreateDeckWordCommandHandler } from "@/src/actions/DeckWord/Commands/CreateDeckWord/CommandHandler"
import { DELETE_DWORD_ITEM_BY_ID_COMMAND } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/Command"
import { DeleteDWordItemByIdCommandHandler } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/CommandHandler"
import { UPDATE_DECK_WORD_COMMAND } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/Command"
import { UpdateDeckWordCommandHandler } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/CommandHandler"

// FLASHCARD CATEGORY COMMANDS
import { CREATE_FLASHCARD_CATEGORY_COMMAND } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/Command"
import { CreateFlashcardCategoryCommandHandler } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/CommandHandler"
import { DeleteFCategoryItemByIdCommandHandler } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/CommandHandler"
import { DELETE_FCATEGORY_ITEM_BY_ID_COMMAND } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/Command"
import { UpdateFlashcardCategoryCommandHandler } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/CommandHandler"
import { UPDATE_FLASHCARD_CATEGORY_COMMAND } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/Command"

// FLASHCARD OLD SESSION COMMANDS
import { CreateFOSCommandHandler } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/CommandHandler"
import { CREATE_FOS_COMMAND } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/Command"

// FLASHCARD SESSION ROW COMMANDS
import { CreateFRowsCommandHandler } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/CommandHandler"
import { CREATE_FROWS_COMMAND } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/Command"

// LISTENING OLD SESSION COMMANDS
import { CreateLOSCommandHandler } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/CommandHandler"
import { CREATE_LOS_COMMAND } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/Command"

// LISTENING SESSION ROW COMMANDS
import { CREATE_LROWS_COMMAND } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/Command"
import { CreateLRowsCommandHandler } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/CommandHandler"

// READING BOOK COMMANDS
import { CreateReadingBookCommandHandler } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/CommandHandler"
import { CREATE_READING_BOOK_COMMAND } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/Command"
import { DELETE_RBOOK_ITEM_BY_ID_COMMAND } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/Command"
import { DeleteRBookItemByIdCommandHandler } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/CommandHandler"
import { UPDATE_READING_BOOK_COMMAND } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/Command"
import { UpdateReadingBookCommandHandler } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/CommandHandler"

// READING OLD SESSION COMMANDS
import { CreateROSCommandHandler } from "@/src/actions/ReadingOldSession/Commands/CreateROS/CommandHandler"
import { CREATE_ROS_COMMAND } from "@/src/actions/ReadingOldSession/Commands/CreateROS/Command"

// READING SESSION ROW COMMANDS
import { CreateRRowsCommandHandler } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/CommandHandler"
import { CREATE_RROWS_COMMAND } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/Command"

// WRITING BOOK COMMANDS
import { CREATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/CreateWritingBook/Command"
import { CreateWritingBookCommandHandler } from "@/src/actions/WritingBook/Commands/CreateWritingBook/CommandHandler"
import { DeleteWBookItemByIdCommandHandler } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/CommandHandler"
import { DELETE_WBOOK_ITEM_BY_ID_COMMAND } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/Command"
import { UPDATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/Command"
import { UpdateWritingBookCommandHandler } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/CommandHandler"

// WRITING OLD SESSION COMMANDS
import { CreateWOSCommandHandler } from "@/src/actions/WritingOldSession/Commands/CreateWOS/CommandHandler"
import { CREATE_WOS_COMMAND } from "@/src/actions/WritingOldSession/Commands/CreateWOS/Command"

// WRITING SESSION ROW COMMANDS
import { CreateWRowsCommandHandler } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/CommandHandler"
import { CREATE_WROWS_COMMAND } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/Command"
import { UpdateProfileInfosHandler } from "@/src/actions/User/Commands/UpdateProfileInfos/CommandHandler"
import { UPDATE_PROFILE_INFOS_COMMAND } from "@/src/actions/User/Commands/UpdateProfileInfos/Command"
import { TYPES } from '../type'

export class CommandModule implements IContainerModule {

    register(container: Container): void {

        // HANDLERS BINDING
        container.bind(SignInCommandHandler).toSelf()
        container.bind(SignUpCommandHandler).toSelf()
        container.bind(CreateDeckWordCommandHandler).toSelf()
        container.bind(DeleteDWordItemByIdCommandHandler).toSelf()
        container.bind(UpdateDeckWordCommandHandler).toSelf()
        container.bind(CreateFlashcardCategoryCommandHandler).toSelf()
        container.bind(DeleteFCategoryItemByIdCommandHandler).toSelf()
        container.bind(UpdateFlashcardCategoryCommandHandler).toSelf()
        container.bind(CreateFOSCommandHandler).toSelf()
        container.bind(CreateFRowsCommandHandler).toSelf()
        container.bind(CreateLOSCommandHandler).toSelf()
        container.bind(CreateLRowsCommandHandler).toSelf()
        container.bind(CreateReadingBookCommandHandler).toSelf()
        container.bind(DeleteRBookItemByIdCommandHandler).toSelf()
        container.bind(UpdateReadingBookCommandHandler).toSelf()
        container.bind(CreateROSCommandHandler).toSelf()
        container.bind(CreateRRowsCommandHandler).toSelf()
        container.bind(CreateWritingBookCommandHandler).toSelf()
        container.bind(DeleteWBookItemByIdCommandHandler).toSelf()
        container.bind(UpdateWritingBookCommandHandler).toSelf()
        container.bind(CreateWOSCommandHandler).toSelf()
        container.bind(CreateWRowsCommandHandler).toSelf()
        container.bind(UpdateProfileInfosHandler).toSelf()

        // BIND REGISTRY AND BUS
        container.bind(CommandHandlerRegistry).toSelf().inSingletonScope()
        container.bind(TYPES.CommandBus).toDynamicValue((context) => {

            const registry = context.get(CommandHandlerRegistry)

            registry.register(SIGN_IN_COMMAND, context.get(SignInCommandHandler))
            registry.register(SIGN_UP_COMMAND, context.get(SignUpCommandHandler))
            registry.register(CREATE_DECK_WORD_COMMAND, context.get(CreateDeckWordCommandHandler))
            registry.register(DELETE_DWORD_ITEM_BY_ID_COMMAND, context.get(DeleteDWordItemByIdCommandHandler))
            registry.register(UPDATE_DECK_WORD_COMMAND, context.get(UpdateDeckWordCommandHandler))
            registry.register(CREATE_FLASHCARD_CATEGORY_COMMAND, context.get(CreateFlashcardCategoryCommandHandler))
            registry.register(DELETE_FCATEGORY_ITEM_BY_ID_COMMAND, context.get(DeleteFCategoryItemByIdCommandHandler))
            registry.register(UPDATE_FLASHCARD_CATEGORY_COMMAND, context.get(UpdateFlashcardCategoryCommandHandler))
            registry.register(CREATE_FOS_COMMAND, context.get(CreateFOSCommandHandler))
            registry.register(CREATE_FROWS_COMMAND, context.get(CreateFRowsCommandHandler))
            registry.register(CREATE_LOS_COMMAND, context.get(CreateLOSCommandHandler))
            registry.register(CREATE_LROWS_COMMAND, context.get(CreateLRowsCommandHandler))
            registry.register(CREATE_READING_BOOK_COMMAND, context.get(CreateReadingBookCommandHandler))
            registry.register(DELETE_RBOOK_ITEM_BY_ID_COMMAND, context.get(DeleteRBookItemByIdCommandHandler))
            registry.register(UPDATE_READING_BOOK_COMMAND, context.get(UpdateReadingBookCommandHandler))
            registry.register(CREATE_ROS_COMMAND, context.get(CreateROSCommandHandler))
            registry.register(CREATE_RROWS_COMMAND, context.get(CreateRRowsCommandHandler))
            registry.register(CREATE_WRITING_BOOK_COMMAND, context.get(CreateWritingBookCommandHandler))
            registry.register(DELETE_WBOOK_ITEM_BY_ID_COMMAND, context.get(DeleteWBookItemByIdCommandHandler))
            registry.register(UPDATE_WRITING_BOOK_COMMAND, context.get(UpdateWritingBookCommandHandler))
            registry.register(CREATE_WOS_COMMAND, context.get(CreateWOSCommandHandler))
            registry.register(CREATE_WROWS_COMMAND, context.get(CreateWRowsCommandHandler))
            registry.register(UPDATE_PROFILE_INFOS_COMMAND, context.get(UpdateProfileInfosHandler))

            return new CommandBus(registry)

        }).inSingletonScope()
    }
}