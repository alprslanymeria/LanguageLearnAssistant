export type ReadingOldSessionDto = {

    oldSessionId: string
    readingId: number
    readingBookId: number
    rate: number
    createdAt: Date
}

export type ReadingOldSessionWithTotalCount = {

    readingOldSessionDtos: ReadingOldSessionDto[]
    totalCount: number
}