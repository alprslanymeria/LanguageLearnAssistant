// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const CREATE_READING_BOOK_COMMAND = "CREATE_READING_BOOK_COMMAND"

export interface CreateReadingBookCommand extends ICommand<number> {

    readonly type: typeof CREATE_READING_BOOK_COMMAND
    formData: FormData
}