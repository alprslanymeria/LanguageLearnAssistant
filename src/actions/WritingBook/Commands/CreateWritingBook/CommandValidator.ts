// IMPORTS
import { z } from "zod"
import { CREATE_WRITING_BOOK_COMMAND } from "./Command"

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

export const CreateWritingBookCommandValidator = z.object({

  type: z.literal(CREATE_WRITING_BOOK_COMMAND),

  request: z.object({

    writingId: z
    .number()
    .int()
    .gt(0, {
      message: "WRITING ID MUST BE GREATER THAN 0"
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
    .instanceof(File, {
      message: "IMAGE FILE IS REQUIRED"
    })
    .refine(file => file.size > 0, {
      message: "IMAGE FILE CANNOT BE EMPTY"
    })
    .refine(file => file.size <= MAX_IMAGE_FILE_SIZE, {
      message: "IMAGE FILE SIZE MUST NOT EXCEED 5MB"
    })
    .refine(file => hasAllowedExtension(file, ALLOWED_IMAGE_EXTENSIONS), {
      message: `IMAGE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
    }),

  sourceFile: z
    .instanceof(File, {
      message: "SOURCE FILE IS REQUIRED"
    })
    .refine(file => file.size > 0, {
      message: "SOURCE FILE CANNOT BE EMPTY"
    })
    .refine(file => file.size <= MAX_SOURCE_FILE_SIZE, {
      message: "SOURCE FILE SIZE MUST NOT EXCEED 50MB"
    })
    .refine(file => hasAllowedExtension(file, ALLOWED_SOURCE_EXTENSIONS), {
      message: `SOURCE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_SOURCE_EXTENSIONS.join(", ")}`
    })

  })
  
})