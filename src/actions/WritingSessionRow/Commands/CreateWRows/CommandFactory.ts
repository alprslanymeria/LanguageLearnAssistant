// IMPORTS
import { SaveWritingRowsRequest } from "@/src/actions/WritingSessionRow/Request"
import { CreateWRowsCommand, CREATE_WROWS_COMMAND } from "@/src/actions/WritingSessionRow/Commands/CreateWRows/Command"

export function createWRowsCommandFactory( request: SaveWritingRowsRequest ): CreateWRowsCommand 
{
  return {
    type: CREATE_WROWS_COMMAND,
    request
  }
}