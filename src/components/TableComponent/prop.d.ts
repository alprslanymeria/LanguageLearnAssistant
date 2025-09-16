// TYPES
import { FlashcardSessionRowInput, ListeningSessinRowInput, ReadingSessionRowInput, WritingSessionRowInput } from "@/src/types/actions"
import { FlashcardSessionRow, ListeningSessionRow, ReadingSessionRow, WritingSessionRow } from "@prisma/client"

type CommonProps = {

    columns: string[]
    total: number
    page: number
    limit: number
    dispatch: React.Dispatch<any> // BU BİLEREK YAPILDI, BÖYLE KALACAK
}

// COMPONENT PROPS
export type TableComponentPropTypes = 
    | (CommonProps & { type: "readingBook", contents: ReadingSessionRowInput[] })
    | (CommonProps & { type: "writingBook", contents: WritingSessionRowInput[] })
    | (CommonProps & { type: "listening", contents: ListeningSessinRowInput[] })
    | (CommonProps & { type: "flashcard", contents: FlashcardSessionRowInput[] })