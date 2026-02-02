// IMPORTS
import { UPDATE_FLASHCARD_CATEGORY_COMMAND, UpdateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/Command"

export function updateFlashcardCategoryCommandFactory( formData: FormData ): UpdateFlashcardCategoryCommand 
{
  return {
    type: UPDATE_FLASHCARD_CATEGORY_COMMAND,
    formData
  }
}