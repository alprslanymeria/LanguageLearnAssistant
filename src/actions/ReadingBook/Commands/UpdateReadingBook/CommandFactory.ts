// IMPORTS
import { UpdateReadingBookCommand, UPDATE_READING_BOOK_COMMAND } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/Command"

export function updateReadingBookCommandFactory( formData: FormData ): UpdateReadingBookCommand 
{
  return {
    type: UPDATE_READING_BOOK_COMMAND,
    formData
  }
}