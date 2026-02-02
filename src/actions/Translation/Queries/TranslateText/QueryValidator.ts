// IMPORTS
import { z } from "zod"
import { TRANSLATE_TEXT_QUERY } from "./Query"

export const TranslateTextQueryValidator = z.object({

    type: z.literal(TRANSLATE_TEXT_QUERY),

    userId: z
        .string()
        .min(1, {
            message: "USER ID MUST NOT BE EMPTY"
    }),

    request: z.object({
        
        selectedText: z
        .string()
        .min(1, {
            message: "SELECTED TEXT MUST NOT BE EMPTY"
        }),

        practice: z
        .string()
        .min(1, {
            message: "SELECTED TEXT MUST NOT BE EMPTY"
        }),

        language: z
        .string()
        .min(1, {
            message: "LANGUAGE MUST NOT BE EMPTY"
        })
        
    })
})