// IMPORTS
import { z } from "zod"
import { TRANSLATE_TEXT_QUERY } from "./Query"

export const TranslateTextQueryValidator = z.object({

    type: z.literal(TRANSLATE_TEXT_QUERY),

    categoryId: z
        .number()
        .int()
        .gt(0, {
            message: "CATEGORY ID MUST BE GREATER THAN 0"
    }),

    request: z.object({
        page: z
        .number()
        .int()
        .gt(0, {
            message: "PAGE MUST BE GREATER THAN 0"
        }),

        pageSize: z
        .number()
        .int()
        .gt(0, {
            message: "PAGE SIZE MUST BE GREATER THAN 0"
        })
        .lte(100, {
            message: "PAGE SIZE MUST NOT EXCEED 100"
        })
        
    })
})