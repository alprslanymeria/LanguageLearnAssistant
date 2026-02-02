// IMPORTS
import { CREATE_FLASHCARD_CATEGORY_COMMAND, CreateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/Command"

export function createFlashcardCategoryCommandFactory(formData: FormData): CreateFlashcardCategoryCommand 
{
  return {
    type: CREATE_FLASHCARD_CATEGORY_COMMAND,
    formData
  }
}