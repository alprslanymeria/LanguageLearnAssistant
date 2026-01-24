// IMPORTS
import { z } from "zod"
import { GET_PRACTICES_BY_LANGUAGE_QUERY } from "./Query"

export const GetPracticesByLanguageQueryValidator = z.object({

    type: z.literal(GET_PRACTICES_BY_LANGUAGE_QUERY),

    language: z
        .string()
        .min(1, {
            message: "LANGUAGE IS REQUIRED"
    })
})