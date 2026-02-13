"use server"

// IMPORTS
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { executeQuery, executeFormDataCommand } from "@/src/infrastructure/mediatR/ActionHelper"
import { CompareLanguageIdRequest } from "@/src/actions/User/Request"
import { UserNotFound } from "@/src/exceptions/NotFound"
import { UserDto } from "./Response"
import { compareLanguageIdQuery } from "@/src/actions/User/Queries/CompareLanguageId/QueryFactory"
import { getProfileInfosQuery } from "./Queries/GetProfileInfos/QueryFactory"
import { updateProfileInfosCommandFactory } from "./Commands/UpdateProfileInfos/CommandFactory"
import { UpdateProfileInfosCommandValidator } from "./Commands/UpdateProfileInfos/CommandValidator"

/// <summary>
/// UPDATE PROFILE INFOS
/// </summary>
export async function UpdateProfileInfos(formData: FormData) : Promise<SerializedServiceResultBase> {

    return executeFormDataCommand(
        "UpdateProfileInfos",
        formData,
        UpdateProfileInfosCommandValidator,
        updateProfileInfosCommandFactory,
        HttpStatusCode.OK,
        { expectedErrors: [UserNotFound], silentErrors: [UserNotFound] }
    )
}

/// <summary>
/// COMPARE LANGUAGE ID
/// </summary>
export async function CompareLanguageId(request: CompareLanguageIdRequest) : Promise<SerializedServiceResult<boolean>> {

    return executeQuery<boolean>(
        "CompareLanguageId",
        () => compareLanguageIdQuery(request),
        { expectedErrors: [UserNotFound], silentErrors: [UserNotFound] }
    )
}

/// <summary>
/// GET PROFILE INFOS
/// </summary>
export async function GetProfileInfos(userId: string) : Promise<SerializedServiceResult<UserDto>> {

    return executeQuery<UserDto>(
        "GetProfileInfos",
        () => getProfileInfosQuery(userId),
        { expectedErrors: [UserNotFound], silentErrors: [UserNotFound] }
    )
}