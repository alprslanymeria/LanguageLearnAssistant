// IMPORTS
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { ICommand } from "@/src/infrastructure/mediatR/ICommand"

export const UPDATE_PROFILE_INFOS_COMMAND = "UPDATE_PROFILE_INFOS_COMMAND"

export interface UpdateProfileInfosCommand extends ICommand<string> {

    readonly type: typeof UPDATE_PROFILE_INFOS_COMMAND
    prevState: ServiceResult<string> | undefined
    formData: FormData
}