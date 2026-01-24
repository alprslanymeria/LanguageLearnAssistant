export type WritingBookDto = {

    writingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export type WritingBookWithLanguageId = {

    writingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
    languageId: number
}

export type WritingBookWithTotalCount = {

    writingBookDtos: WritingBookDto[]
    totalCount: number
}