// IMPORTS
import { UpdateFlashcardCategoryRequest } from "@/src/actions/FlashcardCategory/Request"
import { UPDATE_FLASHCARD_CATEGORY_COMMAND, UpdateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/Command"

export function updateFlashcardCategoryCommandFactory( request: UpdateFlashcardCategoryRequest ): UpdateFlashcardCategoryCommand 
{
  return {
    type: UPDATE_FLASHCARD_CATEGORY_COMMAND,
    request
  }
}