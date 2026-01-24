// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SignUpRequest } from "@/src/actions/Auth/Request"

export const SIGN_UP_COMMAND = "SIGN_UP_COMMAND"

export interface SignUpCommand extends ICommand {

    readonly type: typeof SIGN_UP_COMMAND
    request: SignUpRequest
}