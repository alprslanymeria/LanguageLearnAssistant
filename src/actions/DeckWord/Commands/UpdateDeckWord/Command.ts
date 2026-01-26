// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const UPDATE_DECK_WORD_COMMAND = "UPDATE_DECK_WORD_COMMAND"

export interface UpdateDeckWordCommand extends ICommand<number> {

    readonly type: typeof UPDATE_DECK_WORD_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}