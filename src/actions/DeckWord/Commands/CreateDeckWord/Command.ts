// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { CreateDeckWordRequest } from "@/src/actions/DeckWord/Request"

export const CREATE_DECK_WORD_COMMAND = "CREATE_DECK_WORD_COMMAND"

export interface CreateDeckWordCommand extends ICommand<number> {

    readonly type: typeof CREATE_DECK_WORD_COMMAND
    request: CreateDeckWordRequest
}