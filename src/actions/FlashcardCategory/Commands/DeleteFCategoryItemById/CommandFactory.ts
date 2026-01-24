// IMPORTS
import { DELETE_FCATEGORY_ITEM_BY_ID_COMMAND, DeleteFCategoryItemByIdCommand } from "@/src/actions/FlashcardCategory/Commands/DeleteFCategoryItemById/Command"

export function deleteFCategoryItemByIdCommandFactory( id: number ): DeleteFCategoryItemByIdCommand 
{
  return {
    type: DELETE_FCATEGORY_ITEM_BY_ID_COMMAND,
    id
  }
}