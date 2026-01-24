// IMPORTS
import { z } from "zod"
import { CREATE_LOS_COMMAND } from "./Command"

export const CreateLOSCommandValidator = z.object({

  type: z.literal(CREATE_LOS_COMMAND),

  request: z.object({

    id: z
      .string()
      .min(1, {
        message: "ID IS REQUIRED"
      }),

    listeningId: z
      .number()
      .int()
      .gt(0, {
        message: "LISTENING ID MUST BE GREATER THAN 0."
      }),

    listeningCategoryId: z
      .number()
      .int()
      .gt(0, {
        message: "LISTENING CATEGORY ID MUST BE GREATER THAN 0."
      }),

    rate: z
      .number()
      .min(0, {
        message: "RATE MUST BE BETWEEN 0 AND 100."
      })
      .max(100, {
        message: "RATE MUST BE BETWEEN 0 AND 100."
      })

  })

})