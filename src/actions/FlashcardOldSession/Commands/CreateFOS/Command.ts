// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"

export const CREATE_FOS_COMMAND = "CREATE_FOS_COMMAND"

export interface CreateFOSCommand extends ICommand<string> {

    readonly type: typeof CREATE_FOS_COMMAND
    request: SaveFlashcardOldSessionRequest
}