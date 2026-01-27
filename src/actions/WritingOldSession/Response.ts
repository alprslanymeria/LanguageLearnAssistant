export type WritingOldSessionDto = {

    oldSessionId: string
    writingId: number
    writingBookId: number
    rate: number
    createdAt: Date
}

export type WritingOldSessionWithTotalCount = {

    writingOldSessionDtos: WritingOldSessionDto[]
    totalCount: number
}