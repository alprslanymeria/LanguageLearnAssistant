"use server"

// REACT & NEXT
import { headers } from "next/headers"
// BETTER AUTH
import { APIError } from "better-auth"
// LIBRARY
import { auth } from "@/src/lib/auth"
import { logger } from "@/src/lib/logger"
// TYPES
import { ApiResponse } from "@/src/types/response"
import { SignInProps, SignInResponse, SignUpProps, SignUpResponse } from "@/src/types/actions"
// ZOD
import { ZodError } from "zod"
import { SignInSchema, SignupSchema } from "@/src/zod/actionsSchema"
// UTILS
import { createResponse } from "@/src/utils/response"



export async function SignIn(params: SignInProps) : Promise<ApiResponse<SignInResponse>> {

    try {

        // LOG
        logger.info("SignIn: FORM VERİLERİ ALINDI!", {params})

        // EMAIL & PASSWORD ZOD SCHEMA CONTROL
        const {email, password} = await SignInSchema.parseAsync(params)

        // const session = await auth.api.getSession({

        //     headers: await headers()
        // })

        // CHECK IF USER EXISTANCE / IF NOT THROW ERROR
        // const isUserExist = await prisma?.user.findFirst({

        //     where: {
        //         id: session?.user.id
        //     }
        // })

        // if(!isUserExist) {

        //     throw new Error('User Already Exist!')
        // }

        const response = await auth.api.signInEmail({

            body: {
                email: email,
                password: password,
                callbackURL: "/"
            },
            headers: await headers(),
            // returnHeaders: true --> To get the headers, you can pass the returnHeaders option to the endpoint.
            // asResponse: true To get the Response object, you can pass the asResponse option to the endpoint.
        })

        logger.info("SignIn: SignInWithEmail SUCCESS!")
        return createResponse(true, 200, {data: response.user}, "SUCCESS: SignIn")
        
    } catch (error) {

        if(error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("Signin: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return createResponse<SignInResponse>(false, 400, null, firstError)
        }

        if(error instanceof APIError) {

            logger.error("Signin: API ERROR", {error})
            // SHOW TO USER
            return createResponse<SignInResponse>(false, 400, null, error.message)
        }

        logger.error("SignIn: FAIL", {error})
        return createResponse<SignInResponse>(false, 400, null, "SERVER ERROR!")
    }
}


export async function SignUp(params: SignUpProps) : Promise<ApiResponse<SignUpResponse>> {

    try {

        // LOG
        logger.info("FORM VERİLERİ ALINDI!", {params})
                                
        // ZOD PROCESS
        const {name, email, password, nativeLanguageId} = await SignupSchema.parseAsync(params)

        const session = await auth.api.getSession({

            headers: await headers()
        })

        // CHECK IF USER EXISTANCE / IF NOT THROW ERROR
        const isUserExist = await prisma?.user.findFirst({

            where: {
                id: session?.user.id
            }
        })

        if(!isUserExist) {

            throw new Error('User Already Exist!')
        }

        const response = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                nativeLanguageId,
                callbackURL: "/auth/login",
            },
            // returnHeaders: true --> To get the headers, you can pass the returnHeaders option to the endpoint.
            // asResponse: true To get the Response object, you can pass the asResponse option to the endpoint.
        })

        logger.info("SignUp: SignUpWithEmail SUCCESS!")
        return createResponse(true, 201, {data: response.user}, "SUCCESS: SignUp!")

    } catch (error) {
        
        if (error instanceof ZodError) {

            const firstError = error.issues?.[0]?.message
            logger.error("Signup: INVALID FORM DATA!", {firstError})
            // SHOW TO USER
            return createResponse<SignUpResponse>(false, 400, null, firstError)
        }

        if(error instanceof APIError) {

            logger.error("Signup: API ERROR", {error})
            // SHOW TO USER
            return createResponse<SignUpResponse>(false, 400, null, error.message)
        }

        logger.error("SignUp: FAIL", {error})
        return createResponse<SignUpResponse>(false, 400, null, "SERVER ERROR!")
    }
}