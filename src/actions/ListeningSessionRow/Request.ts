export type ListeningRowItemRequest = {

    listenedSentence: string
    answer: string
    similarity: number
}

export type SaveListeningRowsRequest = {

    listeningOldSessionId: string
    rows: ListeningRowItemRequest[]
}