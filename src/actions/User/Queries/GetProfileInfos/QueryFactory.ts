// IMPORTS
import { GET_PROFILE_INFOS_QUERY, GetProfileInfosQuery } from "./Query"

export function getProfileInfosQuery(userId: string): GetProfileInfosQuery {

    return {
        type: GET_PROFILE_INFOS_QUERY,
        userId
    }
}