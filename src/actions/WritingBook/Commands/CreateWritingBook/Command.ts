// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { CreateWritingBookRequest } from "@/src/actions/WritingBook/Request"

export const CREATE_WRITING_BOOK_COMMAND = "CREATE_WRITING_BOOK_COMMAND"

export interface CreateWritingBookCommand extends ICommand<number> {

    readonly type: typeof CREATE_WRITING_BOOK_COMMAND
    request: CreateWritingBookRequest
}