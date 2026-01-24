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

        languageId: z
            .number()
            .int()
            .gt(0, {
                message: "LANGUAGE ID MUST BE A POSITIVE INTEGER"
            })
    })
})