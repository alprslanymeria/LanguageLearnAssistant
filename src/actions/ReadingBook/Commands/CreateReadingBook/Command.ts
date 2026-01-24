// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { CreateReadingBookRequest } from "@/src/actions/ReadingBook/Request"

export const CREATE_READING_BOOK_COMMAND = "CREATE_READING_BOOK_COMMAND"

export interface CreateReadingBookCommand extends ICommand<number> {

    readonly type: typeof CREATE_READING_BOOK_COMMAND
    request: CreateReadingBookRequest
}