import 'server-only'

// IMPORTS
import { Container } from "inversify"
import { IContainerModule } from "@/src/di/IContainerModule"
import { QueryHandlerRegistry } from "@/src/infrastructure/mediatR/QueryRegistry"
import { QueryBus } from "@/src/infrastructure/mediatR/QueryBus"
import { IPipelineBehavior } from "@/src/infrastructure/mediatR/IPipelineBehavior"

// LANGUAGE QUERIES
import { GET_LANGUAGES_QUERY } from "@/src/actions/Language/Queries/GetLanguages/Query"
import { GetLanguagesQueryHandler } from "@/src/actions/Language/Queries/GetLanguages/QueryHandler"

// DECKWORD QUERIES
import { GET_ALL_DWORDS_WITH_PAGING_QUERY } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/Query"
import { GetAllDWordsWithPagingQueryHandler } from "@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/QueryHandler"
import { GET_DECK_WORD_BY_ID_QUERY } from "@/src/actions/DeckWord/Queries/GetDeckWordById/Query"
import { GetDeckWordByIdQueryHandler } from "@/src/actions/DeckWord/Queries/GetDeckWordById/QueryHandler"

// FLASHCARDCATEGORY QUERIES
import { GetAllFCategoriesWithPagingQueryHandler } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryHandler"
import { GET_ALL_FCATEGORIES_WITH_PAGING_QUERY } from "@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/Query"
import { GetFCategoryCreateItemsQueryHandler } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryHandler"
import { GET_FCATEGORY_CREATE_ITEMS_QUERY } from "@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/Query"
import { GetFlashcardCategoryByIdQueryHandler } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryHandler"
import { GET_FLASHCARD_CATEGORY_BY_ID_QUERY } from "@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/Query"

// FLASHCARD OLD SESSION QUERIES
import { GetFOSWithPagingQueryHandler } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryHandler"
import { GET_FOS_WITH_PAGING_QUERY } from "@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/Query"

// FLASHCARD SESSION ROW QUERIES
import { GetFWordsByIdWithPagingQueryHandler } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryHandler"
import { GET_FWORDS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/Query"

// LISTENING OLD SESSION QUERIES
import { GetLOSWithPagingQueryHandler } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryHandler"
import { GET_LOS_WITH_PAGING_QUERY } from "@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/Query"

// LISTENING SESSION ROW QUERIES
import { GetLRowsByIdWithPagingQueryHandler } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/QueryHandler"
import { GET_LROWS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/Query"

// PRACTICE QUERIES
import { GetPracticesByLanguageQueryHandler } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryHandler"
import { GET_PRACTICES_BY_LANGUAGE_QUERY } from "@/src/actions/Practice/Queries/GetPracticesByLanguage/Query"

// READING BOOK QUERIES
import { GetAllRBooksWithPagingQueryHandler } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/QueryHandler"
import { GET_ALL_RBOOKS_WITH_PAGING_QUERY } from "@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/Query"
import { GetRBookCreateItemsQueryHandler } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/QueryHandler"
import { GET_RBOOK_CREATE_ITEMS_QUERY } from "@/src/actions/ReadingBook/Queries/GetRBookCreateItems/Query"
import { GetReadingBookByIdQueryHandler } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/QueryHandler"
import { GET_READING_BOOK_BY_ID_QUERY } from "@/src/actions/ReadingBook/Queries/GetReadingBookById/Query"

// READING OLD SESSION QUERIES
import { GetROSWithPagingQueryHandler } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryHandler"
import { GET_ROS_WITH_PAGING_QUERY } from "@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/Query"

// READING SESSION ROW QUERIES
import { GetRRowsByIdWithPagingQueryHandler } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryHandler"
import { GET_RROWS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/Query"

// TRANSLATION QUERIES
import { TranslateTextQueryHandler } from "@/src/actions/Translation/Queries/TranslateText/QueryHandler"
import { TRANSLATE_TEXT_QUERY } from "@/src/actions/Translation/Queries/TranslateText/Query"

// WRITING BOOK QUERIES
import { GetAllWBooksWithPagingQueryHandler } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/QueryHandler"
import { GET_ALL_WBOOKS_WITH_PAGING_QUERY } from "@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/Query"
import { GetWBookCreateItemsQueryHandler } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/QueryHandler"
import { GET_WBOOK_CREATE_ITEMS_QUERY } from "@/src/actions/WritingBook/Queries/GetWBookCreateItems/Query"
import { GetWritingBookByIdQueryHandler } from "@/src/actions/WritingBook/Queries/GetWritingBookById/QueryHandler"
import { GET_WRITING_BOOK_BY_ID_QUERY } from "@/src/actions/WritingBook/Queries/GetWritingBookById/Query"

// WRITING OLD SESSION QUERIES
import { GetWOSWithPagingQueryHandler } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryHandler"
import { GET_WOS_WITH_PAGING_QUERY } from "@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/Query"

// WRITING SESSION ROW QUERIES
import { GET_WROWS_BY_ID_WITH_PAGING_QUERY } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/Query"
import { GetWRowsByIdWithPagingQueryHandler } from "@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryHandler"
import { CompareLanguageIdQueryHandler } from "@/src/actions/User/Queries/CompareLanguageId/QueryHandler"
import { GetProfileInfosQueryHandler } from "@/src/actions/User/Queries/GetProfileInfos/QueryHandler"
import { GET_PROFILE_INFOS_QUERY } from "@/src/actions/User/Queries/GetProfileInfos/Query"
import { COMPARE_LANGUAGE_ID_QUERY } from "@/src/actions/User/Queries/CompareLanguageId/Query"
import { TYPES } from '../type'
import { GetAllFCategoriesQueryHandler } from '@/src/actions/FlashcardCategory/Queries/GetAllFCategories/QueryHandler'
import { GET_ALL_FCATEGORIES_QUERY } from '@/src/actions/FlashcardCategory/Queries/GetAllFCategories/Query'
import { GetLCategoryCreateItemsQueryHandler } from '@/src/actions/ListeningCategory/Queries/GetLCategoryCreateItems/QueryHandler'
import { GET_LCATEGORY_CREATE_ITEMS_QUERY } from '@/src/actions/ListeningCategory/Queries/GetLCategoryCreateItems/Query'
import { ValidationRegistry } from '@/src/infrastructure/mediatR/ValidationRegistry'

// QUERY VALIDATORS
import { GetAllDWordsWithPagingQueryValidator } from '@/src/actions/DeckWord/Queries/GetAllDWordsWithPaging/QueryValidator'
import { GetDeckWordByIdQueryValidator } from '@/src/actions/DeckWord/Queries/GetDeckWordById/QueryValidator'
import { GetAllFCategoriesWithPagingQueryValidator } from '@/src/actions/FlashcardCategory/Queries/GetAllFCategoriesWithPaging/QueryValidator'
import { GetAllFCategoriesQueryValidator } from '@/src/actions/FlashcardCategory/Queries/GetAllFCategories/QueryValidator'
import { GetFCategoryCreateItemsQueryValidator } from '@/src/actions/FlashcardCategory/Queries/GetFCategoryCreateItems/QueryValidator'
import { GetFlashcardCategoryByIdQueryValidator } from '@/src/actions/FlashcardCategory/Queries/GetFlashcardCategoryById/QueryValidator'
import { GetFOSWithPagingQueryValidator } from '@/src/actions/FlashcardOldSession/Queries/GetFOSWithPaging/QueryValidator'
import { GetFWordsByIdWithPagingQueryValidator } from '@/src/actions/FlashcardSessionRow/Queries/GetFRowsByIdWithPaging/QueryValidator'
import { GetLCategoryCreateItemsQueryValidator } from '@/src/actions/ListeningCategory/Queries/GetLCategoryCreateItems/QueryValidator'
import { GetLOSWithPagingQueryValidator } from '@/src/actions/ListeningOldSession/Queries/GetLOSWithPaging/QueryValidator'
import { GetLRowsByIdWithPagingQueryValidator } from '@/src/actions/ListeningSessionRow/Queries/GetLRowsByIdWithPaging/QueryValidator'
import { GetPracticesByLanguageQueryValidator } from '@/src/actions/Practice/Queries/GetPracticesByLanguage/QueryValidator'
import { GetAllRBooksWithPagingQueryValidator } from '@/src/actions/ReadingBook/Queries/GetAllRBooksWithPaging/QueryValidator'
import { GetRBookCreateItemsQueryValidator } from '@/src/actions/ReadingBook/Queries/GetRBookCreateItems/QueryValidator'
import { GetReadingBookByIdQueryValidator } from '@/src/actions/ReadingBook/Queries/GetReadingBookById/QueryValidator'
import { GetROSWithPagingQueryValidator } from '@/src/actions/ReadingOldSession/Queries/GetROSWithPaging/QueryValidator'
import { GetRRowsByIdWithPagingQueryValidator } from '@/src/actions/ReadingSessionRow/Queries/GetRRowsByIdWithPaging/QueryValidator'
import { TranslateTextQueryValidator } from '@/src/actions/Translation/Queries/TranslateText/QueryValidator'
import { GetAllWBooksWithPagingQueryValidator } from '@/src/actions/WritingBook/Queries/GetAllWBooksWithPaging/QueryValidator'
import { GetWBookCreateItemsQueryValidator } from '@/src/actions/WritingBook/Queries/GetWBookCreateItems/QueryValidator'
import { GetWritingBookByIdQueryValidator } from '@/src/actions/WritingBook/Queries/GetWritingBookById/QueryValidator'
import { GetWOSWithPagingQueryValidator } from '@/src/actions/WritingOldSession/Queries/GetWOSWithPaging/QueryValidator'
import { GetWRowsByIdWithPagingQueryValidator } from '@/src/actions/WritingSessionRow/Queries/GetWRowsByIdWithPaging/QueryValidator'
import { CompareLanguageIdQueryValidator } from '@/src/actions/User/Queries/CompareLanguageId/QueryValidator'
import { GetProfileInfosQueryValidator } from '@/src/actions/User/Queries/GetProfileInfos/QueryValidator'

export class QueryModule implements IContainerModule {

    register(container: Container): void {

        // HANDLERS BINDING
        container.bind(GetLanguagesQueryHandler).toSelf()
        container.bind(GetAllDWordsWithPagingQueryHandler).toSelf()
        container.bind(GetDeckWordByIdQueryHandler).toSelf()
        container.bind(GetAllFCategoriesWithPagingQueryHandler).toSelf()
        container.bind(GetAllFCategoriesQueryHandler).toSelf()
        container.bind(GetFCategoryCreateItemsQueryHandler).toSelf()
        container.bind(GetFlashcardCategoryByIdQueryHandler).toSelf()
        container.bind(GetFOSWithPagingQueryHandler).toSelf()
        container.bind(GetFWordsByIdWithPagingQueryHandler).toSelf()
        container.bind(GetLOSWithPagingQueryHandler).toSelf()
        container.bind(GetLRowsByIdWithPagingQueryHandler).toSelf()
        container.bind(GetLCategoryCreateItemsQueryHandler).toSelf()
        container.bind(GetPracticesByLanguageQueryHandler).toSelf()
        container.bind(GetAllRBooksWithPagingQueryHandler).toSelf()
        container.bind(GetRBookCreateItemsQueryHandler).toSelf()
        container.bind(GetReadingBookByIdQueryHandler).toSelf()
        container.bind(GetROSWithPagingQueryHandler).toSelf()
        container.bind(GetRRowsByIdWithPagingQueryHandler).toSelf()
        container.bind(TranslateTextQueryHandler).toSelf()
        container.bind(GetAllWBooksWithPagingQueryHandler).toSelf()
        container.bind(GetWBookCreateItemsQueryHandler).toSelf()
        container.bind(GetWritingBookByIdQueryHandler).toSelf()
        container.bind(GetWOSWithPagingQueryHandler).toSelf()
        container.bind(GetWRowsByIdWithPagingQueryHandler).toSelf()
        container.bind(CompareLanguageIdQueryHandler).toSelf()
        container.bind(GetProfileInfosQueryHandler).toSelf()

        // REGISTRY AND BUS BINDING
        container.bind(QueryHandlerRegistry).toSelf().inSingletonScope()
        container.bind(TYPES.QueryBus).toDynamicValue((context) => {

            const registry = context.get(QueryHandlerRegistry)

            registry.register(GET_LANGUAGES_QUERY, context.get(GetLanguagesQueryHandler))
            registry.register(GET_ALL_DWORDS_WITH_PAGING_QUERY, context.get(GetAllDWordsWithPagingQueryHandler))
            registry.register(GET_DECK_WORD_BY_ID_QUERY, context.get(GetDeckWordByIdQueryHandler))
            registry.register(GET_ALL_FCATEGORIES_WITH_PAGING_QUERY, context.get(GetAllFCategoriesWithPagingQueryHandler))
            registry.register(GET_ALL_FCATEGORIES_QUERY, context.get(GetAllFCategoriesQueryHandler))
            registry.register(GET_FCATEGORY_CREATE_ITEMS_QUERY, context.get(GetFCategoryCreateItemsQueryHandler))
            registry.register(GET_FLASHCARD_CATEGORY_BY_ID_QUERY, context.get(GetFlashcardCategoryByIdQueryHandler))
            registry.register(GET_FOS_WITH_PAGING_QUERY, context.get(GetFOSWithPagingQueryHandler))
            registry.register(GET_FWORDS_BY_ID_WITH_PAGING_QUERY, context.get(GetFWordsByIdWithPagingQueryHandler))
            registry.register(GET_LOS_WITH_PAGING_QUERY, context.get(GetLOSWithPagingQueryHandler))
            registry.register(GET_LROWS_BY_ID_WITH_PAGING_QUERY, context.get(GetLRowsByIdWithPagingQueryHandler))
            registry.register(GET_LCATEGORY_CREATE_ITEMS_QUERY, context.get(GetLCategoryCreateItemsQueryHandler))
            registry.register(GET_PRACTICES_BY_LANGUAGE_QUERY, context.get(GetPracticesByLanguageQueryHandler))
            registry.register(GET_ALL_RBOOKS_WITH_PAGING_QUERY, context.get(GetAllRBooksWithPagingQueryHandler))
            registry.register(GET_RBOOK_CREATE_ITEMS_QUERY, context.get(GetRBookCreateItemsQueryHandler))
            registry.register(GET_READING_BOOK_BY_ID_QUERY, context.get(GetReadingBookByIdQueryHandler))
            registry.register(GET_ROS_WITH_PAGING_QUERY, context.get(GetROSWithPagingQueryHandler))
            registry.register(GET_RROWS_BY_ID_WITH_PAGING_QUERY, context.get(GetRRowsByIdWithPagingQueryHandler))
            registry.register(TRANSLATE_TEXT_QUERY, context.get(TranslateTextQueryHandler))
            registry.register(GET_ALL_WBOOKS_WITH_PAGING_QUERY, context.get(GetAllWBooksWithPagingQueryHandler))
            registry.register(GET_WBOOK_CREATE_ITEMS_QUERY, context.get(GetWBookCreateItemsQueryHandler))
            registry.register(GET_WRITING_BOOK_BY_ID_QUERY, context.get(GetWritingBookByIdQueryHandler))
            registry.register(GET_WOS_WITH_PAGING_QUERY, context.get(GetWOSWithPagingQueryHandler))
            registry.register(GET_WROWS_BY_ID_WITH_PAGING_QUERY, context.get(GetWRowsByIdWithPagingQueryHandler))
            registry.register(COMPARE_LANGUAGE_ID_QUERY, context.get(CompareLanguageIdQueryHandler))
            registry.register(GET_PROFILE_INFOS_QUERY, context.get(GetProfileInfosQueryHandler))

            // REGISTER QUERY VALIDATORS
            const validationRegistry = context.get<ValidationRegistry>(TYPES.ValidationRegistry)

            validationRegistry.register(GET_ALL_DWORDS_WITH_PAGING_QUERY, GetAllDWordsWithPagingQueryValidator)
            validationRegistry.register(GET_DECK_WORD_BY_ID_QUERY, GetDeckWordByIdQueryValidator)
            validationRegistry.register(GET_ALL_FCATEGORIES_WITH_PAGING_QUERY, GetAllFCategoriesWithPagingQueryValidator)
            validationRegistry.register(GET_ALL_FCATEGORIES_QUERY, GetAllFCategoriesQueryValidator)
            validationRegistry.register(GET_FCATEGORY_CREATE_ITEMS_QUERY, GetFCategoryCreateItemsQueryValidator)
            validationRegistry.register(GET_FLASHCARD_CATEGORY_BY_ID_QUERY, GetFlashcardCategoryByIdQueryValidator)
            validationRegistry.register(GET_FOS_WITH_PAGING_QUERY, GetFOSWithPagingQueryValidator)
            validationRegistry.register(GET_FWORDS_BY_ID_WITH_PAGING_QUERY, GetFWordsByIdWithPagingQueryValidator)
            validationRegistry.register(GET_LCATEGORY_CREATE_ITEMS_QUERY, GetLCategoryCreateItemsQueryValidator)
            validationRegistry.register(GET_LOS_WITH_PAGING_QUERY, GetLOSWithPagingQueryValidator)
            validationRegistry.register(GET_LROWS_BY_ID_WITH_PAGING_QUERY, GetLRowsByIdWithPagingQueryValidator)
            validationRegistry.register(GET_PRACTICES_BY_LANGUAGE_QUERY, GetPracticesByLanguageQueryValidator)
            validationRegistry.register(GET_ALL_RBOOKS_WITH_PAGING_QUERY, GetAllRBooksWithPagingQueryValidator)
            validationRegistry.register(GET_RBOOK_CREATE_ITEMS_QUERY, GetRBookCreateItemsQueryValidator)
            validationRegistry.register(GET_READING_BOOK_BY_ID_QUERY, GetReadingBookByIdQueryValidator)
            validationRegistry.register(GET_ROS_WITH_PAGING_QUERY, GetROSWithPagingQueryValidator)
            validationRegistry.register(GET_RROWS_BY_ID_WITH_PAGING_QUERY, GetRRowsByIdWithPagingQueryValidator)
            validationRegistry.register(TRANSLATE_TEXT_QUERY, TranslateTextQueryValidator)
            validationRegistry.register(GET_ALL_WBOOKS_WITH_PAGING_QUERY, GetAllWBooksWithPagingQueryValidator)
            validationRegistry.register(GET_WBOOK_CREATE_ITEMS_QUERY, GetWBookCreateItemsQueryValidator)
            validationRegistry.register(GET_WRITING_BOOK_BY_ID_QUERY, GetWritingBookByIdQueryValidator)
            validationRegistry.register(GET_WOS_WITH_PAGING_QUERY, GetWOSWithPagingQueryValidator)
            validationRegistry.register(GET_WROWS_BY_ID_WITH_PAGING_QUERY, GetWRowsByIdWithPagingQueryValidator)
            validationRegistry.register(COMPARE_LANGUAGE_ID_QUERY, CompareLanguageIdQueryValidator)
            validationRegistry.register(GET_PROFILE_INFOS_QUERY, GetProfileInfosQueryValidator)

            // RESOLVE PIPELINE BEHAVIORS
            const behaviors = context.getAll<IPipelineBehavior<any, any>>(TYPES.PipelineBehavior)

            return new QueryBus(registry, behaviors)
            
        }).inSingletonScope()
    }
}