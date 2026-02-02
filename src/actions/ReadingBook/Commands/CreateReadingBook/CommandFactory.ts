// IMPORTS
import { CREATE_READING_BOOK_COMMAND, CreateReadingBookCommand } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/Command"
import { SerializedServiceResult } from "@/src/infrastructure/common/ServiceResult"

export function createReadingBookCommandFactory( formData: FormData ): CreateReadingBookCommand 
{
  return {
    type: CREATE_READING_BOOK_COMMAND,
    formData
  }
}