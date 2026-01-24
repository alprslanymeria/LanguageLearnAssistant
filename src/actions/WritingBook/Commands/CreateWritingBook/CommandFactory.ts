// IMPORTS
import { CreateWritingBookRequest } from "@/src/actions/WritingBook/Request"
import { CreateWritingBookCommand, CREATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/CreateWritingBook/Command"

export function createWritingBookCommandFactory( request: CreateWritingBookRequest ): CreateWritingBookCommand 
{
  return {
    type: CREATE_WRITING_BOOK_COMMAND,
    request
  }
}