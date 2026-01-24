// IMPORTS
import { CreateReadingBookRequest } from "@/src/actions/ReadingBook/Request"
import { CREATE_READING_BOOK_COMMAND, CreateReadingBookCommand } from "@/src/actions/ReadingBook/Commands/CreateReadingBook/Command"

export function createReadingBookCommandFactory( request: CreateReadingBookRequest ): CreateReadingBookCommand 
{
  return {
    type: CREATE_READING_BOOK_COMMAND,
    request
  }
}