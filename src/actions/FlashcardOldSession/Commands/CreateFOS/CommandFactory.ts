// IMPORTS
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"
import { CREATE_FOS_COMMAND, CreateFOSCommand } from "@/src/actions/FlashcardOldSession/Commands/CreateFOS/Command"

export function createFOSCommandFactory( request: SaveFlashcardOldSessionRequest ): CreateFOSCommand 
{
  return {
    type: CREATE_FOS_COMMAND,
    request
  }
}