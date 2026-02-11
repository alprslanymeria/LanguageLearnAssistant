// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const UPDATE_FLASHCARD_CATEGORY_COMMAND = "UPDATE_FLASHCARD_CATEGORY_COMMAND"

export interface UpdateFlashcardCategoryCommand extends ICommand {

    readonly type: typeof UPDATE_FLASHCARD_CATEGORY_COMMAND
    formData: FormData
}