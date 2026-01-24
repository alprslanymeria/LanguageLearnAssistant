// IMPORTS
import { UpdateReadingBookRequest } from "@/src/actions/ReadingBook/Request"
import { UpdateReadingBookCommand, UPDATE_READING_BOOK_COMMAND } from "@/src/actions/ReadingBook/Commands/UpdateReadingBook/Command"

export function updateReadingBookCommandFactory( request: UpdateReadingBookRequest ): UpdateReadingBookCommand 
{
  return {
    type: UPDATE_READING_BOOK_COMMAND,
    request
  }
}