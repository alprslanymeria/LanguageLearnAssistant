// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const DELETE_WBOOK_ITEM_BY_ID_COMMAND = "DELETE_WBOOK_ITEM_BY_ID_COMMAND"

export interface DeleteWBookItemByIdCommand extends ICommand {

    readonly type: typeof DELETE_WBOOK_ITEM_BY_ID_COMMAND
    id: number
}