// IMPORTS
import { UPDATE_DECK_WORD_COMMAND, UpdateDeckWordCommand } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/Command"

export function updateDeckWordCommandFactory( formData: FormData ): UpdateDeckWordCommand 
{
  return {
    type: UPDATE_DECK_WORD_COMMAND,
    formData
  }
}