// IMPORTS
import { IQuery } from "@/src/infrastructure/mediatR/IQuery"
import { UserDto } from "@/src/actions/User/Response"

export const GET_PROFILE_INFOS_QUERY = "GET_PROFILE_INFOS_QUERY"

export interface GetProfileInfosQuery extends IQuery<UserDto> {

    readonly type: typeof GET_PROFILE_INFOS_QUERY
    userId: string
}