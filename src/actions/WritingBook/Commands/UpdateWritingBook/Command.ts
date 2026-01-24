// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { UpdateWritingBookRequest } from "@/src/actions/WritingBook/Request"

export const UPDATE_WRITING_BOOK_COMMAND = "UPDATE_WRITING_BOOK_COMMAND"

export interface UpdateWritingBookCommand extends ICommand<number> {

    readonly type: typeof UPDATE_WRITING_BOOK_COMMAND
    request: UpdateWritingBookRequest
}