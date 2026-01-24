// IMPORTS
import { z } from "zod"
import { UPDATE_READING_BOOK_COMMAND } from "./Command"

// CONSTANTS
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
const ALLOWED_SOURCE_EXTENSIONS = [".pdf", ".epub", ".txt", ".docx", ".doc"]

const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const MAX_SOURCE_FILE_SIZE = 50 * 1024 * 1024 // 50MB

// CHECK IS FILE EXTENSION ALLOWED
const hasAllowedExtension = (file: File, allowed: string[]) => {

  const ext = "." + file.name.split(".").pop()?.toLowerCase()

  return allowed.includes(ext)
}


export const UpdateReadingBookCommandValidator = z.object({

  type: z.literal(UPDATE_READING_BOOK_COMMAND),

  request: z.object({

    id: z
      .number()
      .int()
      .gt(0, {
        message: "ID MUST BE GREATER THAN 0"
      }),

    readingId: z
      .number()
      .int()
      .gt(0, {
        message: "READING ID MUST BE GREATER THAN 0"
      }),

    name: z
      .string()
      .min(1, {
        message: "NAME IS REQUIRED"
      })
      .max(200, {
        message: "NAME MUST NOT EXCEED 200 CHARACTERS"
      }),

    userId: z
      .string()
      .min(1, {
        message: "USER ID IS REQUIRED"
      }),

    imageFile: z
      .instanceof(File)
      .optional()
      .refine(
        file => !file || file.size <= MAX_IMAGE_FILE_SIZE,
        {
          message: "IMAGE FILE SIZE MUST NOT EXCEED 5MB"
        }
      )
      .refine(
        file => !file || hasAllowedExtension(file, ALLOWED_IMAGE_EXTENSIONS),
        {
          message: `IMAGE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
        }
      ),

    sourceFile: z
      .instanceof(File)
      .optional()
      .refine(
        file => !file || file.size <= MAX_SOURCE_FILE_SIZE,
        {
          message: "SOURCE FILE SIZE MUST NOT EXCEED 50MB"
        }
      )
      .refine(
        file => !file || hasAllowedExtension(file, ALLOWED_SOURCE_EXTENSIONS),
        {
          message: `SOURCE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_SOURCE_EXTENSIONS.join(", ")}`
        }
      )
  })
    
})