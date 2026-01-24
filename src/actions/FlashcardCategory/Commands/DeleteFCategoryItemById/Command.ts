// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const DELETE_FCATEGORY_ITEM_BY_ID_COMMAND = "DELETE_FCATEGORY_ITEM_BY_ID_COMMAND"

export interface DeleteFCategoryItemByIdCommand extends ICommand {

    readonly type: typeof DELETE_FCATEGORY_ITEM_BY_ID_COMMAND
    id: number
}