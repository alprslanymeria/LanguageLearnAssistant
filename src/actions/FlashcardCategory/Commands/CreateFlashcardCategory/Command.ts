// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const CREATE_FLASHCARD_CATEGORY_COMMAND = "CREATE_FLASHCARD_CATEGORY_COMMAND"

export interface CreateFlashcardCategoryCommand extends ICommand<number> {

    readonly type: typeof CREATE_FLASHCARD_CATEGORY_COMMAND
    formData: FormData
}