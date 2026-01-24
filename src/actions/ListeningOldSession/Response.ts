export type ListeningOldSessionDto = {

    listeningId: number
    listeningCategoryId: number
    rate: number
    createdAt: Date
}

export type ListeningOldSessionWithTotalCount = {

    listeningOldSessionDtos: ListeningOldSessionDto[]
    totalCount: number
}