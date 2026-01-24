// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"
import { SignInRequest } from "@/src/actions/Auth/Request"

export const SIGN_IN_COMMAND = "SIGN_IN_COMMAND"

export interface SignInCommand extends ICommand {

    readonly type: typeof SIGN_IN_COMMAND
    request: SignInRequest
}