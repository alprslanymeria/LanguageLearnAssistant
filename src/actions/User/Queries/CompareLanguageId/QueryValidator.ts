// IMPORTS
import { z } from "zod"
import { COMPARE_LANGUAGE_ID_QUERY } from "./Query"

export const CompareLanguageIdQueryValidator = z.object({

    type: z.literal(COMPARE_LANGUAGE_ID_QUERY),

    request: z.object({

        userId: z
            .string()
            .min(1, {
                message: "USER ID IS REQUIRED"
            }),

        languageName: z
            .string()
            .min(1, {
                message: "LANGUAGE NAME IS REQUIRED"
            })
    })
})