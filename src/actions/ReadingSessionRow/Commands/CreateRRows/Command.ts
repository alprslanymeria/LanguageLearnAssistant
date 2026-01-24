// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"

export const CREATE_RROWS_COMMAND = "CREATE_RROWS_COMMAND"

export interface CreateRRowsCommand extends ICommand<number> {

    readonly type: typeof CREATE_RROWS_COMMAND
    request: SaveReadingRowsRequest
}