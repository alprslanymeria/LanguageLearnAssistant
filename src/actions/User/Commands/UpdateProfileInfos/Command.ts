// IMPORTS
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const UPDATE_PROFILE_INFOS_COMMAND = "UPDATE_PROFILE_INFOS_COMMAND"

export interface UpdateProfileInfosCommand extends ICommand {

    readonly type: typeof UPDATE_PROFILE_INFOS_COMMAND
    formData: FormData
}