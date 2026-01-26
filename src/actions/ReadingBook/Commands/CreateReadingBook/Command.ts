// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const CREATE_READING_BOOK_COMMAND = "CREATE_READING_BOOK_COMMAND"

export interface CreateReadingBookCommand extends ICommand<number> {

    readonly type: typeof CREATE_READING_BOOK_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}