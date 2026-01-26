// IMPORTS
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { UPDATE_PROFILE_INFOS_COMMAND, UpdateProfileInfosCommand } from "./Command"

export function updateProfileInfosCommandFactory( prevState: ServiceResult<string> | undefined, formData: FormData ): UpdateProfileInfosCommand {

    return {
        type: UPDATE_PROFILE_INFOS_COMMAND,
        prevState,
        formData
    }
}