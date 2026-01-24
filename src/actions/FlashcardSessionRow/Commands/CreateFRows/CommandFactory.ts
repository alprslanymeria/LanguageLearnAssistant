// IMPORTS
import { SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"
import { CREATE_FROWS_COMMAND, CreateFRowsCommand } from "@/src/actions/FlashcardSessionRow/Commands/CreateFRows/Command"

export function createFRowsCommandFactory( request: SaveFlashcardRowsRequest ): CreateFRowsCommand 
{
  return {
    type: CREATE_FROWS_COMMAND,
    request
  }
}