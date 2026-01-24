// IMPORTS
import { SignUpCommand, SIGN_UP_COMMAND } from "@/src/actions/Auth/Commands/SignUp/Command"
import { SignUpRequest } from "@/src/actions/Auth/Request"

export function signUpCommandFactory( request: SignUpRequest ): SignUpCommand 
{
  return {
    type: SIGN_UP_COMMAND,
    request
  }
}