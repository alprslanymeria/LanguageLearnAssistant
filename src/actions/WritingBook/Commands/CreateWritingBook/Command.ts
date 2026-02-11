// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const CREATE_WRITING_BOOK_COMMAND = "CREATE_WRITING_BOOK_COMMAND"

export interface CreateWritingBookCommand extends ICommand {

    readonly type: typeof CREATE_WRITING_BOOK_COMMAND
    formData: FormData
}