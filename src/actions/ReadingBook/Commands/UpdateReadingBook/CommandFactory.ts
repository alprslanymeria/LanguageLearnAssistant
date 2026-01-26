// IMPORTS
import { UpdateReadingBookCommand, UPDATE_READING_BOOK_COMMAND } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function updateReadingBookCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): UpdateReadingBookCommand 
{
  return {
    type: UPDATE_READING_BOOK_COMMAND,
    prevState,
    formData
  }
}