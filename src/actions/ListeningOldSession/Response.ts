export type ListeningOldSessionDto = {

    oldSessionId: string
    listeningId: number
    listeningCategoryId: number
    rate: number
    createdAt: Date
}

export type ListeningOldSessionWithTotalCount = {

    listeningOldSessionDtos: ListeningOldSessionDto[]
    totalCount: number
}