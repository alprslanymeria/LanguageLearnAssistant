// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const CREATE_DECK_WORD_COMMAND = "CREATE_DECK_WORD_COMMAND"

export interface CreateDeckWordCommand extends ICommand<number> {

    readonly type: typeof CREATE_DECK_WORD_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}