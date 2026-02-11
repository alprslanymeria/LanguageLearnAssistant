// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SaveListeningRowsRequest } from "@/src/actions/ListeningSessionRow/Request"

export const CREATE_LROWS_COMMAND = "CREATE_LROWS_COMMAND"

export interface CreateLRowsCommand extends ICommand {

    readonly type: typeof CREATE_LROWS_COMMAND
    request: SaveListeningRowsRequest
}