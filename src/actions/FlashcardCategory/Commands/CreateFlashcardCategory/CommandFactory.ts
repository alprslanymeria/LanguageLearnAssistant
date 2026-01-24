// IMPORTS
import { CreateFlashcardCategoryRequest } from "@/src/actions/FlashcardCategory/Request"
import { CREATE_FLASHCARD_CATEGORY_COMMAND, CreateFlashcardCategoryCommand } from "@/src/actions/FlashcardCategory/Commands/CreateFlashcardCategory/Command"

export function createFlashcardCategoryCommandFactory( request: CreateFlashcardCategoryRequest ): CreateFlashcardCategoryCommand 
{
  return {
    type: CREATE_FLASHCARD_CATEGORY_COMMAND,
    request
  }
}