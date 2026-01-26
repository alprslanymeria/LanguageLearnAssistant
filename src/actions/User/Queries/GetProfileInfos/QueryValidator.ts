// IMPORTS
import { z } from "zod"
import { GET_PROFILE_INFOS_QUERY } from "./Query"

export const GetProfileInfosQueryValidator = z.object({

    type: z.literal(GET_PROFILE_INFOS_QUERY),

    userId: z
        .string()
        .min(1, {
            message: "USER ID IS REQUIRED"
        })
})