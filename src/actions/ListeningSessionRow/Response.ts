// IMPORTS
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"

export type ListeningSessionRowDto = {

    id: number
    listeningOldSessionId: string
    listenedSentence: string
    answer: string
    similarity: number
}

export type ListeningRowsResponse = {

    item: ListeningCategoryWithDeckVideos
    contents: ListeningSessionRowDto[]
    total: number
}