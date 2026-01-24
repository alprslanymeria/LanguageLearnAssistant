export type CreateWritingBookRequest = {

    writingId: number
    name: string
    imageFile: File
    sourceFile: File
    userId: string
    languageId: number
}

export type UpdateWritingBookRequest = {

    id: number
    writingId: number
    name: string
    imageFile?: File
    sourceFile?: File
    userId: string
    languageId: number
}