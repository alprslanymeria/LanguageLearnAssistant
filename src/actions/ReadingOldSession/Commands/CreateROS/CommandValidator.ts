// IMPORTS
import { z } from "zod"
import { CREATE_ROS_COMMAND } from "./Command"

export const CreateROSCommandValidator = z.object({

  type: z.literal(CREATE_ROS_COMMAND),

  request: z.object({

    id: z
      .string()
      .min(1, {
        message: "ID IS REQUIRED"
      }),

    readingId: z
      .number()
      .int()
      .gt(0, {
        message: "READING ID MUST BE GREATER THAN 0"
      }),

    readingBookId: z
      .number()
      .int()
      .gt(0, {
        message: "READING BOOK ID MUST BE GREATER THAN 0"
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