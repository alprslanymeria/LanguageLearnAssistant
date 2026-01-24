// IMPORTS
import { SIGN_IN_COMMAND, SignInCommand } from "@/src/actions/Auth/Commands/SignIn/Command"
import { SignInRequest } from "@/src/actions/Auth/Request"

export function signInCommandFactory( request: SignInRequest ): SignInCommand 
{
  return {
    type: SIGN_IN_COMMAND,
    request
  }
}