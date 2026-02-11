// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"

export const CREATE_FROWS_COMMAND = "CREATE_FROWS_COMMAND"

export interface CreateFRowsCommand extends ICommand {

    readonly type: typeof CREATE_FROWS_COMMAND
    request: SaveFlashcardRowsRequest
}