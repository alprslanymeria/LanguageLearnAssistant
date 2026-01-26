// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const UPDATE_READING_BOOK_COMMAND = "UPDATE_READING_BOOK_COMMAND"

export interface UpdateReadingBookCommand extends ICommand<number> {

    readonly type: typeof UPDATE_READING_BOOK_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}