// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export const CREATE_FLASHCARD_CATEGORY_COMMAND = "CREATE_FLASHCARD_CATEGORY_COMMAND"

export interface CreateFlashcardCategoryCommand extends ICommand<number> {

    readonly type: typeof CREATE_FLASHCARD_CATEGORY_COMMAND
    prevState: ServiceResult<number> | undefined
    formData: FormData
}