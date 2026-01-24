// IMPORTS
import { UpdateWritingBookRequest } from "@/src/actions/WritingBook/Request"
import { UpdateWritingBookCommand, UPDATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/Command"

export function updateWritingBookCommandFactory( request: UpdateWritingBookRequest ): UpdateWritingBookCommand 
{
  return {
    type: UPDATE_WRITING_BOOK_COMMAND,
    request
  }
}