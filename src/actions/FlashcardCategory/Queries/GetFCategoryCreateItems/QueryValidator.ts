// IMPORTS
import { z } from "zod"
import { GET_FCATEGORY_CREATE_ITEMS_QUERY } from "./Query"

export const GetFCategoryCreateItemsQueryValidator = z.object({

    type: z.literal(GET_FCATEGORY_CREATE_ITEMS_QUERY),

    userId: z
        .string()
        .min(1, {
            message: "USER ID IS REQUIRED"
        }),

    language: z
        .string()
        .min(1, {
            message: "LANGUAGE IS REQUIRED"
        }),

    practice: z
        .string()
        .min(1, {
            message: "PRACTICE IS REQUIRED"
        })
})