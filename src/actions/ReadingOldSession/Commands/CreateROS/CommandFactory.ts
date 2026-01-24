// IMPORTS
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"
import { CREATE_ROS_COMMAND, CreateROSCommand } from "@/src/actions/ReadingOldSession/Commands/CreateROS/Command"

export function createROSCommandFactory( request: SaveReadingOldSessionRequest ): CreateROSCommand 
{
  return {
    type: CREATE_ROS_COMMAND,
    request
  }
}