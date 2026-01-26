// IMPORTS
import z from "zod"
import { GET_ALL_FCATEGORIES_QUERY } from "./Query"

export const GetAllFCategoriesQueryValidator = z.object({

    type: z.literal(GET_ALL_FCATEGORIES_QUERY),

    userId: z
        .string()
        .min(1, {
            message: "USER ID IS REQUIRED"
        }),

})