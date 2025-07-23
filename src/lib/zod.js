// 3RD PARTY
import {z} from "zod";


// ZOD SCHEMAS
export const signupSchema = z.object({
    email: z.string().email({ message: "code_4" }).trim(), // ERROR_MESSAGE --> PLEASE CHECK EMAIL FORMAT (+)
    password: z
      .string()
      .min(8, { message: "code_5" }) // ERROR_MESSAGE --> PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS (+)
      .trim(),
    operation: z.any(),
    nativeLanguageId: z.any()
  })

export const loginSchema = z.object({
    email: z.string().email({ message: "code_6" }).trim(), // ERROR_MESSAGE --> PLEASE CHECK EMAIL FORMAT (+)
    password: z
      .string()
      .min(8, { message: "code_7" }) // ERROR_MESSAGE --> PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS (+)
      .trim(),
    operation: z.any(),
    nativeLanguageId: z.any()
})