// IMPORTS
import { DELETE_RBOOK_ITEM_BY_ID_COMMAND, DeleteRBookItemByIdCommand } from "@/src/actions/ReadingBook/Commands/DeleteRBookItemById/Command"

export function deleteRBookItemByIdCommandFactory( id: number ): DeleteRBookItemByIdCommand 
{
  return {
    type: DELETE_RBOOK_ITEM_BY_ID_COMMAND,
    id
  }
}