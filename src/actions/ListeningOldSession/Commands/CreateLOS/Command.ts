// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"

export const CREATE_LOS_COMMAND = "CREATE_LOS_COMMAND"

export interface CreateLOSCommand extends ICommand {

    readonly type: typeof CREATE_LOS_COMMAND
    request: SaveListeningOldSessionRequest
}