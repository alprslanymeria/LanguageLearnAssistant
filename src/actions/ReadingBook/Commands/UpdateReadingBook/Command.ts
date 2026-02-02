// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const UPDATE_READING_BOOK_COMMAND = "UPDATE_READING_BOOK_COMMAND"

export interface UpdateReadingBookCommand extends ICommand<number> {

    readonly type: typeof UPDATE_READING_BOOK_COMMAND
    formData: FormData
}