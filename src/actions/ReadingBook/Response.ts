export type ReadingBookDto = {

    id: number
    readingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export type ReadingBookWithLanguageId = {

    id: number
    readingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
    languageId: number
}

export type ReadingBookWithTotalCount = {

    readingBookDtos: ReadingBookDto[]
    totalCount: number
}