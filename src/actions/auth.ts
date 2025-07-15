"use server"

// REACT & NEXT
import {signIn, signOut} from "@/src/Auth"
import { redirect } from "next/navigation";
// 3RD PARTY
import {z} from "zod";
import { v4 as uuidv4 } from "uuid"
// UTILS
import { hashPassword } from "@/src/lib/bcrypt";
// LIBRARIES
import {prisma} from "@/src/lib/prisma";


// ZOD SCHEMAS
const signupSchema = z.object({
    email: z.string().email({ message: "Hatalı E-mail formatı girdiniz" }).trim(),
    password: z
      .string()
      .min(8, { message: "Şifre minimum 8 karakter uzunluğunda olmalıdır" })
      .trim(),
  })

const loginSchema = z.object({
email: z.string().email({ message: "Hatalı E-mail formatı girdiniz" }).trim(),
password: z
    .string()
    .min(8, { message: "Şifre minimum 8 karakter uzunluğunda olmalıdır" })
    .trim()
})


// ACTIONS
export async function signUpWithCredentials(prevState : any, formData : FormData)
{
    // VALIDATION
    const result = signupSchema.safeParse(Object.fromEntries(formData))

    if(!result.success)
    {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { email, password} = result.data

    // IS EXISTING USER
    const hasUser = await prisma.user.findFirst({
        where: {
            email: email,
        },
    })

    if (hasUser != null) {
        return {
            errors: {
                email: ["Bu e-mail adresi ile kayıtlı bir kullanıcı zaten var"],
            },
        }
    }

    // SIGNUP
    const hashedPassword = await hashPassword(password)
    const nativeLanguageId = Number(formData.get("nativeLanguageId"))
    const userId = uuidv4()

    await prisma.user.create({
        data: {
            userId: userId,
            email: email,
            password: hashedPassword,
            nativeLanguageId: nativeLanguageId,
            updatedAt: new Date(),
        }
    });

    redirect("/auth/login")
}

export async function signInWithCredentials(prevState : any, formData : FormData){

    // VALIDATION
    const result = loginSchema.safeParse(Object.fromEntries(formData))

    if(!result.success)
    {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { email, password} = result.data;

    // SIGN IN VIA NEXT AUTH
    try {
        
        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
    })

    } catch (error) {
        
        if(error instanceof Error) return {message: "Invalid Email or Password"}

    }

    redirect("/")
    
}

export async function logOut(){

    await signOut({redirect: true, redirectTo: "/auth/login"})
}