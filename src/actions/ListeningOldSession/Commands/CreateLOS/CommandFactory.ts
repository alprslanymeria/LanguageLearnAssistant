// IMPORTS
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"
import { CREATE_LOS_COMMAND, CreateLOSCommand } from "@/src/actions/ListeningOldSession/Commands/CreateLOS/Command"

export function createLOSCommandFactory( request: SaveListeningOldSessionRequest ): CreateLOSCommand 
{
  return {
    type: CREATE_LOS_COMMAND,
    request
  }
}