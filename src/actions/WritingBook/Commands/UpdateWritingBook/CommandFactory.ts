// IMPORTS
import { UpdateWritingBookCommand, UPDATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/Command"

export function updateWritingBookCommandFactory( formData: FormData ): UpdateWritingBookCommand 
{
  return {
    type: UPDATE_WRITING_BOOK_COMMAND,
    formData
  }
}