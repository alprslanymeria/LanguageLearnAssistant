// IMPORTS
import { z } from "zod"
import { CREATE_WOS_COMMAND } from "./Command"

export const CreateWOSCommandValidator = z.object({

  type: z.literal(CREATE_WOS_COMMAND),

  request: z.object({

    id: z
    .string()
    .min(1, {
      message: "ID IS REQUIRED"
    }),

  writingId: z
    .number()
    .int()
    .gt(0, {
      message: "WRITING ID MUST BE GREATER THAN 0"
    }),

  writingBookId: z
    .number()
    .int()
    .gt(0, {
      message: "WRITING BOOK ID MUST BE GREATER THAN 0"
    }),

  rate: z
    .number()
    .min(0, {
      message: "RATE MUST BE BETWEEN 0 AND 100"
    })
    .max(100, {
      message: "RATE MUST BE BETWEEN 0 AND 100"
    })

  })
  
})