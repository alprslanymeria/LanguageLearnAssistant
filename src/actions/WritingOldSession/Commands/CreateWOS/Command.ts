// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"

export const CREATE_WOS_COMMAND = "CREATE_WOS_COMMAND"

export interface CreateWOSCommand extends ICommand {

    readonly type: typeof CREATE_WOS_COMMAND
    request: SaveWritingOldSessionRequest
}