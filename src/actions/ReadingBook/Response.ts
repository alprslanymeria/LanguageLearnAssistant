export type ReadingBookDto = {

    readingId: number
    name: string
    imageUrl: string
    leftColor: string
    sourceUrl: string
}

export type ReadingBookWithLanguageId = {

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