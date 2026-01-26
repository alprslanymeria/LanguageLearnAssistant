// IMPORTS
import { CREATE_READING_BOOK_COMMAND, CreateReadingBookCommand } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/Command"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function createReadingBookCommandFactory( prevState: ServiceResult<number> | undefined, formData: FormData ): CreateReadingBookCommand 
{
  return {
    type: CREATE_READING_BOOK_COMMAND,
    prevState,
    formData
  }
}