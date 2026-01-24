// IMPORTS
import { DELETE_DWORD_ITEM_BY_ID_COMMAND, DeleteDWordItemByIdCommand } from "@/src/actions/DeckWord/Commands/DeleteDWordItemById/Command"

export function createDeleteDWordItemByIdCommandFactory(id: number): DeleteDWordItemByIdCommand 
{
  return {
    type: DELETE_DWORD_ITEM_BY_ID_COMMAND,
    id
  }
}