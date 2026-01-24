export type CreateReadingBookRequest = {

    readingId: number
    name: string
    imageFile: File
    sourceFile: File
    userId: string
    languageId: number
}

export type UpdateReadingBookRequest = {

    id: number
    readingId: number
    name: string
    imageFile?: File
    sourceFile?: File
    userId: string
    languageId: number
}