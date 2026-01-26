// IMPORTS
import { CREATE_DECK_WORD_COMMAND, CreateDeckWordCommand } from "@/src/actions/DeckWord/Commands/CreateDeckWord/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function createDeckWordFactory(prevState: ServiceResult<number> | undefined, formData: FormData): CreateDeckWordCommand
{
    return {
        type: CREATE_DECK_WORD_COMMAND,
        prevState,
        formData
    }
}