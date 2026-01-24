// IMPORTS
import { ListeningCategory } from "@/src/generated/prisma/client"

export type ListeningSessionRowDto = {

    listeningOldSessionId: string
    listenedSentence: string
    answer: string
    similarity: number
}

export type ListeningRowsResponse = {

    item: ListeningCategory
    contents: ListeningSessionRowDto[]
    total: number
}