// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveWritingRowsRequest } from "@/src/actions/WritingSessionRow/Request"

export const CREATE_WROWS_COMMAND = "CREATE_WROWS_COMMAND"

export interface CreateWRowsCommand extends ICommand<number> {

    readonly type: typeof CREATE_WROWS_COMMAND
    request: SaveWritingRowsRequest
}