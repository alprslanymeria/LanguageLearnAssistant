// IMPORTS
import { z } from "zod"

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

  itemId: z
    .coerce
    .number()
    .int()  
    .gt(0, {
      message: "ITEM ID MUST BE GREATER THAN 0"
    }),

  languageId: z
    .coerce
    .number()
    .int()
    .gt(0, {
      message: "LANGUAGE ID MUST BE GREATER THAN 0"
    }),

  bookName: z
    .string()
    .min(1, {
      message: "NAME IS REQUIRED"
    })
    .max(200, {
      message: "NAME MUST NOT EXCEED 200 CHARACTERS"
    }),

  practice: z
      .string()
      .min(1, {
        message: "PRACTICE IS REQUIRED"
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
      file => !file || file.size === 0 || file.name === 'blob' || file.size <= MAX_IMAGE_FILE_SIZE,
      {
        message: "IMAGE FILE SIZE MUST NOT EXCEED 5MB"
      }
    )
    .refine(
      file => !file || file.size === 0 || file.name === 'blob' || hasAllowedExtension(file, ALLOWED_IMAGE_EXTENSIONS),
      {
        message: `IMAGE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
      }
    ),

  sourceFile: z
    .instanceof(File)
    .optional()
    .refine(
      file => !file || file.size === 0 || file.name === 'blob' || file.size <= MAX_SOURCE_FILE_SIZE,
      {
        message: "SOURCE FILE SIZE MUST NOT EXCEED 50MB"
      }
    )
    .refine(
      file => !file || file.size === 0 || file.name === 'blob' || hasAllowedExtension(file, ALLOWED_SOURCE_EXTENSIONS),
      {
        message: `SOURCE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_SOURCE_EXTENSIONS.join(", ")}`
      }
    )
  
})