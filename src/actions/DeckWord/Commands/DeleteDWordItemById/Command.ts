// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const DELETE_DWORD_ITEM_BY_ID_COMMAND = "DELETE_DWORD_ITEM_BY_ID_COMMAND"

export interface DeleteDWordItemByIdCommand extends ICommand {

    readonly type: typeof DELETE_DWORD_ITEM_BY_ID_COMMAND
    id: number
}