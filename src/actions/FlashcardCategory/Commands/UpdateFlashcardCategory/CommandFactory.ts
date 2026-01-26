// IMPORTS
import { UPDATE_FLASHCARD_CATEGORY_COMMAND, UpdateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/UpdateFlashcardCategory/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function updateFlashcardCategoryCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): UpdateFlashcardCategoryCommand 
{
  return {
    type: UPDATE_FLASHCARD_CATEGORY_COMMAND,
    prevState,
    formData
  }
}