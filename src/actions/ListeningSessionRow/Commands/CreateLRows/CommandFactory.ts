// IMPORTS
import { SaveListeningRowsRequest } from "@/src/actions/ListeningSessionRow/Request"
import { CreateLRowsCommand, CREATE_LROWS_COMMAND } from "@/src/actions/ListeningSessionRow/Commands/CreateLRows/Command"

export function createLRowsCommandFactory( request: SaveListeningRowsRequest ): CreateLRowsCommand 
{
  return {
    type: CREATE_LROWS_COMMAND,
    request
  }
}