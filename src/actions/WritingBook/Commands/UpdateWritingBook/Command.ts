// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const UPDATE_WRITING_BOOK_COMMAND = "UPDATE_WRITING_BOOK_COMMAND"

export interface UpdateWritingBookCommand extends ICommand<number> {

    readonly type: typeof UPDATE_WRITING_BOOK_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}