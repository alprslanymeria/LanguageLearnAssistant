// IMPORTS
import { DeleteWBookItemByIdCommand, DELETE_WBOOK_ITEM_BY_ID_COMMAND } from "@/src/actions/WritingBook/Commands/DeleteWBookItemById/Command"

export function deleteWBookItemByIdCommandFactory( id: number ): DeleteWBookItemByIdCommand 
{
  return {
    type: DELETE_WBOOK_ITEM_BY_ID_COMMAND,
    id
  }
}