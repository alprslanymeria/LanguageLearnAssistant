export type WritingBookDto = {

    id: number
    writingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export type WritingBookWithLanguageId = {

    id: number
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