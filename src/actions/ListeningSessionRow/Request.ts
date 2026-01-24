export type ListeningRowItemRequest = {

    listenedSentence: string
    answer: string
    similarity: number
}

export type SaveListeningRowsRequest = {

    listeningSessionId: string
    rows: ListeningRowItemRequest[]
}