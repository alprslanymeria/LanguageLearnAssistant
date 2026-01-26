// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const UPDATE_FLASHCARD_CATEGORY_COMMAND = "UPDATE_FLASHCARD_CATEGORY_COMMAND"

export interface UpdateFlashcardCategoryCommand extends ICommand<number> {

    readonly type: typeof UPDATE_FLASHCARD_CATEGORY_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}