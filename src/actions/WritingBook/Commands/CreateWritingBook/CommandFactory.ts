// IMPORTS
import { CreateWritingBookCommand, CREATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/CreateWritingBook/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function createWritingBookCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): CreateWritingBookCommand 
{
  return {
    type: CREATE_WRITING_BOOK_COMMAND,
    prevState,
    formData
  }
}