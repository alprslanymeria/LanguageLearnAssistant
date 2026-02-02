// IMPORTS
import { CREATE_DECK_WORD_COMMAND, CreateDeckWordCommand } from "@/src/actions/DeckWord/Commands/CreateDeckWord/Command"

export function createDeckWordFactory(formData: FormData): CreateDeckWordCommand
{
    return {
        type: CREATE_DECK_WORD_COMMAND,
        formData
    }
}