// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const UPDATE_WRITING_BOOK_COMMAND = "UPDATE_WRITING_BOOK_COMMAND"

export interface UpdateWritingBookCommand extends ICommand {

    readonly type: typeof UPDATE_WRITING_BOOK_COMMAND
    formData: FormData
}