// IMPORTS
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"
import { CREATE_WOS_COMMAND, CreateWOSCommand } from "@/src/actions/WritingOldSession/Commands/CreateWOS/Command"

export function createWOSCommandFactory( request: SaveWritingOldSessionRequest ): CreateWOSCommand 
{
  return {
    type: CREATE_WOS_COMMAND,
    request
  }
}