// IMPORTS
import { z } from "zod"

// CONSTANTS
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// CHECK IS FILE EXTENSION ALLOWED
const hasAllowedExtension = (file: File, allowed: string[]) => {

  const ext = "." + file.name.split(".").pop()?.toLowerCase()

  return allowed.includes(ext)
}

export const UpdateProfileInfosCommandValidator = z.object({

    userId: z
        .string()
        .min(1, {
          message: "USER ID IS REQUIRED"
        }),

    name: z
        .string()
        .min(1, {
            message: "NAME IS REQUIRED"
        })
        .max(200, {
            message: "NAME MUST NOT EXCEED 200 CHARACTERS"
        }),

    nativeLanguageId: z
        .coerce
        .number()
        .int()
        .gt(0, {
            message: "NATIVE LANGUAGE ID MUST BE GREATER THAN 0"
        }),

    image: z
        .instanceof(File)
        .optional()
        .refine(
          file => !file || file.size === 0 || file.name === 'blob' || file.size <= MAX_IMAGE_FILE_SIZE,
          {
            message: "PROFILE IMAGE FILE SIZE MUST NOT EXCEED 5MB"
          }
        )
        .refine(
          file => !file || file.size === 0 || file.name === 'blob' || hasAllowedExtension(file, ALLOWED_IMAGE_EXTENSIONS),
          {
            message: `PROFILE IMAGE FILE MUST BE ONE OF THE FOLLOWING TYPES: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
          }
        )
})