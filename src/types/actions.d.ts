// TYPES
import { FlashcardCategoryWithDeckWords, ListeningCategoryWithDeckVideos } from "@/src/types/globalStore"
import { 
    DeckVideo, DeckWord, FlashcardCategory, FlashcardOldSession, FlashcardSessionRow, Language, 
    ListeningCategory, ListeningOldSession, ListeningSessionRow, LiveSession, Practice, 
    Prisma, ReadingBook, ReadingOldSession, ReadingSessionRow, WritingBook, WritingOldSession, WritingSessionRow } from "@prisma/client"
import { User } from "better-auth"


// LANGUAGE
export type GetLanguagesResponse = {

    data: Language[]
}

export type CompareLanguageIdProps = {

    userId: string,
    languageId: number
}



// PRACTICE
export type GetPracticesProps = {

    language : string | undefined
}

export type GetPracticeResponse = {

    data: Practice[]
}




// OLD SESSION
export type GetOldSessionsProps = {

    userId: string | undefined
    language: string | null
    practice: string | undefined
    page: number
    limit: number
}

export type GetOldSessionsResponse = {

    data: {

        data: FlashcardOldSession[] | ReadingOldSession[] | WritingOldSession[] | ListeningOldSession[]
        total: number
    } 
}

export type SaveOldSessionProps = {

    oldSessionRow: 
    | ReadingOldSessionInput
    | WritingOldSessionInput
    | FlashcardOldSessionInput
    | ListeningOldSessionInput
}

export type SaveOldSessionResponse = {

    data: ReadingOldSession | WritingOldSession | ListeningOldSession | FlashcardOldSession
}

export type ReadingOldSessionInput  = Omit<ReadingOldSession, "createdAt" | "rate">  & { from: "reading", rate: number }
export type WritingOldSessionInput  = Omit<WritingOldSession, "createdAt" | "rate">  & { from: "writing", rate: number }
export type FlashcardOldSessionInput = Omit<FlashcardOldSession, "createdAt" | "rate"> & { from: "flashcard", rate: number }
export type ListeningOldSessionInput = Omit<ListeningOldSession, "createdAt" | "rate"> & { from: "listening", rate: number }




// ROWS
export type GetRowsByIdProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
    oldSessionId: string | null
    page: number
    limit: number
}

export type GetRowsByIdResponse = {

    data: {

        type: string
        reading?: { item: ReadingBook , contents: ReadingSessionRow[] , total: number }
        writing?: { item: WritingBook , contents: WritingSessionRow[] , total: number }
        listening?: { item: ListeningCategory , contents: ListeningSessionRow[] , total: number }
        flashcard?: { item: FlashcardCategory , contents: FlashcardSessionRow[] , total: number}
    }
}

export type SaveRowsProps = {

  rows: (
        ReadingSessionRowInput | 
        WritingSessionRowInput | 
        FlashcardSessionRowInput | 
        ListeningSessinRowInput
    )[]
}

export type ReadingSessionRowInput  = Omit<ReadingSessionRow, "id" | "oldSession" | "similarity">  & { id?: number, from?: "reading", similarity: number }
export type WritingSessionRowInput  = Omit<WritingSessionRow, "id" | "oldSession" | "similarity">  & { id?: number, from?: "writing", similarity: number }
export type FlashcardSessionRowInput = Omit<FlashcardSessionRow, "id" | "oldSession"> & { id?: number, from?: "flashcard" }
export type ListeningSessinRowInput = Omit<ListeningSessionRow, "id" | "oldSession" | "similarity"> & { id?: number, from?: "listening", similarity: number }



// TRANSLATE
export type TranslateTextProps = {

    userId: string | undefined
    selectedText: string
    language: string
    practice: string
}


// RATE
export type CalculateRateProps = {

    inputOne: string
    inputTwo: string
}


// UTILS

export type GetCreateItemsProps = {

    userId: string | undefined
    language: string | null
    practice: string | null
}

export type GetCreateItemsResponse = {

    data: ReadingBook[] | WritingBook[] | ListeningCategoryWithDeckVideos[] | FlashcardCategoryWithDeckWords[]
}


// LIST
export type GetAllRBooksProps = {

    userId: string | undefined
    page: number
    limit: number
}

export type GetAllRBooksResponse = {

    data: ReadingBook[]
    total: number
}

export type GetAllWBooksProps = {

    userId: string | undefined
    page: number
    limit: number
}

export type GetAllWBooksResponse = {

    data: WritingBook[]
    total: number
}

export type GetAllFCategoriesProps = {

    userId: string | undefined
}

export type GetAllFCategoriesResponse = {

    data: FlashcardCategory[]
}

export type GetAllFCategoriesWithPagingProps = {

    userId: string | undefined
    page: number
    limit: number
}

export type GetAllFCategoriesWithPagingResponse = {

    data: FlashcardCategory[]
    total: number
}

export type GetAllFWordsProps = {

    userId: string | undefined
    page: number
    limit: number
}

export type GetAllFWordsResponse = {
    
    data: DeckWord[]
    total: number
}





// CRUD
export type GetItemByIdProps = {

    table: string | null
    itemId: string | null | undefined
}

export type GetItemByIdResponse = {

    data: RBWL | WBWL | LCWL | DVWCL | FCWL | DWWCL
}

export type DeleteByIdProps = {

    table: string | null
    itemId: number | null
}

export type GetLeftSideColorProps = {

    bufferForFile : ArrayBuffer
}

export type GetExistingRecordProps = {

    table: string | null
    itemId: number | null
}

export type RBWL = Prisma.ReadingBookGetPayload<{

    include: {
        reading: {
            select: {
                languageId: true
            }
        }
    }
}>

export type WBWL = Prisma.WritingBookGetPayload<{
    
    include: {
        writing: {
            select: {
                languageId: true
            }
        }
    }
}>

export type LCWL = Prisma.ListeningCategoryGetPayload<{
    
    include: {
        listening: {
            select: {
                languageId: true
            }
        }
    }
}>

export type DVWCL = Prisma.DeckVideoGetPayload<{
    
    include: {
        category: {
            include: {
                listening: {
                    select: {
                        languageId: true
                    }
                }
            }
        }
    }
}>

export type FCWL = Prisma.FlashcardCategoryGetPayload<{
    
    include: {
        flashcard: {
            select: {
                languageId: true
            }
        }
    }
}>

export type DWWCL = Prisma.DeckWordGetPayload<{
    
    include: {
        category: {
            include: {
                flashcard: {
                    select: {
                        languageId: true
                    }
                }
            }
        }
    }
}>



// PROFILE

export type GetProfileInfosProps = {

    userId: string | undefined
}

export type GetProfileInfosResponse = {

    data: SelectedUser | null
}

export type SaveProfileInfosResponse = {

    data: UpdatedUser

}

type SelectedUser = Prisma.UserGetPayload<{

    select: {
        id: true
        name: true
        email: true
        image: true
        nativeLanguageId: true
    }
}>

type UpdatedUser = Prisma.UserGetPayload<{

    select: {
        id: true
        name: true
        email: true
        image: true
        nativeLanguageId: true
    }
}>



// AUTH
export type SignInProps = {

    email: string,
    password: string
}

export type SignInResponse = {

    data: User
}

export type SignUpProps = {

    name: string,
    email: string,
    password: string,
    nativeLanguageId: number
}

export type SignUpResponse = {

    data: User
}