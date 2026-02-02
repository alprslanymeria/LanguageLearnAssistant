// IMPORTS
import { CreateWritingBookCommand, CREATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/CreateWritingBook/Command"

export function createWritingBookCommandFactory( formData: FormData ): CreateWritingBookCommand 
{
  return {
    type: CREATE_WRITING_BOOK_COMMAND,
    formData
  }
}