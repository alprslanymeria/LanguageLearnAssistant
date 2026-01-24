// IMPORTS
import { SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"
import { CREATE_RROWS_COMMAND, CreateRRowsCommand } from "@/src/actions/ReadingSessionRow/Commands/CreateRRows/Command"

export function createRRowsCommandFactory( request: SaveReadingRowsRequest ): CreateRRowsCommand 
{
  return {
    type: CREATE_RROWS_COMMAND,
    request
  }
}