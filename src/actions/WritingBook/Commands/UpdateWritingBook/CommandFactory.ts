// IMPORTS
import { UpdateWritingBookCommand, UPDATE_WRITING_BOOK_COMMAND } from "@/src/actions/WritingBook/Commands/UpdateWritingBook/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function updateWritingBookCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): UpdateWritingBookCommand 
{
  return {
    type: UPDATE_WRITING_BOOK_COMMAND,
    prevState,
    formData
  }
}