// IMPORTS
import { CREATE_FLASHCARD_CATEGORY_COMMAND, CreateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function createFlashcardCategoryCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): CreateFlashcardCategoryCommand 
{
  return {
    type: CREATE_FLASHCARD_CATEGORY_COMMAND,
    prevState,
    formData
  }
}