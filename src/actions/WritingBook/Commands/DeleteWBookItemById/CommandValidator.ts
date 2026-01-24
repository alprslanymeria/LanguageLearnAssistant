// IMPORTS
import { z } from "zod"
import { DELETE_WBOOK_ITEM_BY_ID_COMMAND } from "./Command"

export const DeleteWBookItemByIdCommandValidator = z.object({

  type: z.literal(DELETE_WBOOK_ITEM_BY_ID_COMMAND),

  id: z
    .number()
    .int()
    .gt(0, {
      message: "ID MUST BE GREATER THAN 0"
    })
})