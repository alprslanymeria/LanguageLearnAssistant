// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { UpdateDeckWordRequest } from "@/src/actions/DeckWord/Request"

export const UPDATE_DECK_WORD_COMMAND = "UPDATE_DECK_WORD_COMMAND"

export interface UpdateDeckWordCommand extends ICommand<number> {

    readonly type: typeof UPDATE_DECK_WORD_COMMAND
    request: UpdateDeckWordRequest
}