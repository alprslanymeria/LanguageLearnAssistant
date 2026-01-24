// IMPORTS
import { z } from "zod"
import { GET_LROWS_BY_ID_WITH_PAGING_QUERY } from "./Query"

export const GetLRowsByIdWithPagingQueryValidator = z.object({

    type: z.literal(GET_LROWS_BY_ID_WITH_PAGING_QUERY),

    oldSessionId: z
        .string()
        .min(1, {
            message: "OLD SESSION ID IS REQUIRED"
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