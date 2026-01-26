// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const CREATE_WRITING_BOOK_COMMAND = "CREATE_WRITING_BOOK_COMMAND"

export interface CreateWritingBookCommand extends ICommand<number> {

    readonly type: typeof CREATE_WRITING_BOOK_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}