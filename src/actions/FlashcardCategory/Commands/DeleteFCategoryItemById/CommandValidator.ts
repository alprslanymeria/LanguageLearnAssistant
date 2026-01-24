// IMPORTS
import { z } from "zod"
import { DELETE_FCATEGORY_ITEM_BY_ID_COMMAND } from "./Command"

export const DeleteFCategoryItemByIdCommandValidator = z.object({

  type: z.literal(DELETE_FCATEGORY_ITEM_BY_ID_COMMAND),
  
  id: z
    .number()
    .int()
    .gt(0, {
      message: "ID MUST BE GREATER THAN 0"
    })
})