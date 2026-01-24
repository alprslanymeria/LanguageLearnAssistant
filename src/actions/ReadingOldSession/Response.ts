export type ReadingOldSessionDto = {

    readingId: number
    readingBookId: number
    rate: number
    createdAt: Date
}

export type ReadingOldSessionWithTotalCount = {

    readingOldSessionDtos: ReadingOldSessionDto[]
    totalCount: number
}