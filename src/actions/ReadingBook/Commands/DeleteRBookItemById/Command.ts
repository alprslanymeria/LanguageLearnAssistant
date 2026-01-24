// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const DELETE_RBOOK_ITEM_BY_ID_COMMAND = "DELETE_RBOOK_ITEM_BY_ID_COMMAND"

export interface DeleteRBookItemByIdCommand extends ICommand {

    readonly type: typeof DELETE_RBOOK_ITEM_BY_ID_COMMAND
    id: number
}