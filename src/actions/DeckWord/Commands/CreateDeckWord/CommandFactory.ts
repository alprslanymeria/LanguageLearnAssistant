// IMPORTS
import { CREATE_DECK_WORD_COMMAND, CreateDeckWordCommand } from "@/src/actions/DeckWord/Commands/CreateDeckWord/Command"
import { CreateDeckWordRequest } from "@/src/actions/DeckWord/Request"

export function createDeckWordFactory(request: CreateDeckWordRequest): CreateDeckWordCommand
{
    return {
        type: CREATE_DECK_WORD_COMMAND,
        request
    }
}