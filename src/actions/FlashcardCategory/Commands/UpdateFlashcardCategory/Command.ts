// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { UpdateFlashcardCategoryRequest } from "@/src/actions/FlashcardCategory/Request"

export const UPDATE_FLASHCARD_CATEGORY_COMMAND = "UPDATE_FLASHCARD_CATEGORY_COMMAND"

export interface UpdateFlashcardCategoryCommand extends ICommand<number> {

    readonly type: typeof UPDATE_FLASHCARD_CATEGORY_COMMAND
    request: UpdateFlashcardCategoryRequest
}