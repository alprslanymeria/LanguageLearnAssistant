// IMPORTS
import { UPDATE_PROFILE_INFOS_COMMAND, UpdateProfileInfosCommand } from "./Command"

export function updateProfileInfosCommandFactory( formData: FormData ): UpdateProfileInfosCommand {

    return {
        type: UPDATE_PROFILE_INFOS_COMMAND,
        formData
    }
}