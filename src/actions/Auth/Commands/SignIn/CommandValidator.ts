// IMPORTS
import { z } from "zod"
import { SIGN_IN_COMMAND } from "./Command"

export const SignInCommandValidator = z.object({

    type: z.literal(SIGN_IN_COMMAND),

    request: z.object({

        email: z.email("Invalid email address")
                .min(1, "Email is required"),
        password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    })
})