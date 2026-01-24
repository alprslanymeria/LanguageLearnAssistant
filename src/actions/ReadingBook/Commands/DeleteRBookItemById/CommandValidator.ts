// IMPORTS
import { z } from "zod"
import { DELETE_RBOOK_ITEM_BY_ID_COMMAND } from "./Command"

export const DeleteRBookItemByIdCommandValidator = z.object({

  type: z.literal(DELETE_RBOOK_ITEM_BY_ID_COMMAND),

    id: z
      .number()
      .int()
      .gt(0, {
        message: "ID MUST BE GREATER THAN 0"
      })
})