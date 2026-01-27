// TYPES
import { FlashcardRowItemRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { ListeningRowItemRequest } from "@/src/actions/ListeningSessionRow/Request"
import { ReadingRowItemRequest } from "@/src/actions/ReadingSessionRow/Request"
import { WritingRowItemRequest } from "@/src/actions/WritingSessionRow/Request"


type CommonProps = {

    columns: string[]
    total: number
    page: number
    limit: number
    dispatch: React.Dispatch<any> // BU BİLEREK YAPILDI, BÖYLE KALACAK
}

// COMPONENT PROPS
export type TableComponentPropTypes = 
    | (CommonProps & { type: "readingBook", contents: ReadingRowItemRequest[] })
    | (CommonProps & { type: "writingBook", contents: WritingRowItemRequest[] })
    | (CommonProps & { type: "listening", contents: ListeningRowItemRequest[] })
    | (CommonProps & { type: "flashcard", contents: FlashcardRowItemRequest[] })