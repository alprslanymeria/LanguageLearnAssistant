// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"

export const CREATE_ROS_COMMAND = "CREATE_ROS_COMMAND"

export interface CreateROSCommand extends ICommand {

    readonly type: typeof CREATE_ROS_COMMAND
    request: SaveReadingOldSessionRequest
}