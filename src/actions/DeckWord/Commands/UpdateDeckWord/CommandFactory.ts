// IMPORTS
import { UPDATE_DECK_WORD_COMMAND, UpdateDeckWordCommand } from "@/src/actions/DeckWord/Commands/UpdateDeckWord/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function updateDeckWordCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): UpdateDeckWordCommand 
{
  return {
    type: UPDATE_DECK_WORD_COMMAND,
    prevState,
    formData
  }
}