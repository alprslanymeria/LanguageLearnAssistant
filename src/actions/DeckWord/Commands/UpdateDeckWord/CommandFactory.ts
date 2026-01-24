// IMPORTS
import { UpdateDeckWordRequest } from "@/src/actions/DeckWord/Request"
import { UPDATE_DECK_WORD_COMMAND, UpdateDeckWordCommand } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/Command"

export function updateDeckWordCommandFactory( request: UpdateDeckWordRequest ): UpdateDeckWordCommand 
{
  return {
    type: UPDATE_DECK_WORD_COMMAND,
    request
  }
}