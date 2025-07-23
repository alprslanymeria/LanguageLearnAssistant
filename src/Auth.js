// NEXT AUTH
import NextAuth,{ CredentialsSignin }  from "next-auth"
import Credentials from "next-auth/providers/credentials"
// ADAPTER
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { comparePassword, hashPassword } from "./lib/bcrypt"
import { v4 as uuidv4 } from "uuid"
import { loginSchema, signupSchema } from "./lib/zod"
import { ZodError } from "zod"
import Google from "next-auth/providers/google"


// DEFINE ADAPTER
const adapter = PrismaAdapter(prisma)

// // CUSTOM ERROR CLASSES
class UnexpectedError extends CredentialsSignin {
    code = "code_1"
    // ERROR_MESSAGE --> UNEXPECTED ERROR (+)
}

class UserAlreadyExistsError extends CredentialsSignin {
  code = "code_2"
  // ERROR_MESSAGE --> USER ALREADY EXIST (+)
}

class InvalidCredentialsError extends CredentialsSignin {
  code = "code_3"  
  // ERROR_MESSAGE --> INVALID EMAIL OR PASSWORD (+)
}

class CustomZodError extends CredentialsSignin {
    constructor(zodErrors = []) {
        super()
        this.code = zodErrors.map(err => `${err.message}`).join(', ')
    }
}


// CONFIGURATION
export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt"
    },
    jwt: {
        // WE CAN HANDLE JWT TOKEN CONFIGURATION
    },
    adapter: adapter,
    providers: [ 
        Google,
        //WORKS ON SignIn() CALL
        Credentials({
            credentials: {
                email: {},
                password:  {},
                nativeLanguageId: {},
                operation: {}
            },
            async authorize(credentials) {

                try {
                    
                    //DEFINE USER
                    let user = null

                    //CHECK CREDENTIALS AND OPERATION
                    if (!credentials?.operation) throw new UnexpectedError()

                    // SIGNUP OPERATION
                    if(credentials.operation == "signup") {

                        try {
                            
                            // ZOD PROCESS
                            const {email, password} = await signupSchema.parseAsync(credentials)

                            // GET USER
                            user = await adapter.getUserByEmail(email)

                            // IF USER EXIST AND TRY TO SIGNUP THROW ERROR
                            if (user != null) throw new UserAlreadyExistsError()

                            // IF USER NOT EXIST CREATE USER
                            const hashedPassword = await hashPassword(password)
                            const userId = uuidv4()

                            const newUser = await adapter.createUser({
                                id: userId,
                                email: email,
                                password: hashedPassword,
                                nativeLanguageId: parseInt(credentials.nativeLanguageId, 10)
                            })

                            return newUser

                        } catch (err) {
                            
                            if (err instanceof ZodError) throw new CustomZodError(err.errors)

                            throw err
                        }

                    }

                    // LOGIN OPERATION
                    if(credentials.operation == "login") {

                        try {
                            
                            // ZOD PROCESS
                            const {email, password} = await loginSchema.parseAsync(credentials)

                            // GET USER
                            user = await adapter.getUserByEmail(email)

                            // IF USER NOT EXIST AND TRY TO LOGIN THROW ERROR
                            if (user == null) throw new InvalidCredentialsError()

                            // COMPARE PASSWORD
                            const isPasswordMatch = await comparePassword(password, user.password)

                            // IF USER EXIST BUT PASSWORD WRONG THROW ERROR
                            if (!isPasswordMatch) throw new InvalidCredentialsError()

                            return user

                        } catch (err) {
                            
                            if(err instanceof ZodError) throw new CustomZodError(err.errors)

                            throw err
                        }
                    }

                } catch (error) {
                    
                    throw error
                }

                return null
            }  
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        // WORKS ON AUTH CALL & useSession() CALL & AFTER USER LOGIN
        async jwt({token, user}) {
            
            // LOGIN OLMUŞ KULLANICI BİLGİLERİNİ TOKENE EKLEMEK İÇİN KULLANILIR
            if (user) {
                token.sub = user.id
                token.email = user.email
            }
            
            return token
        },
        // WORKS ON AUTH CALL & useSession() CALL & AFTER USER LOGIN
        async session({session, token}) {

            // SESSION NESNESİNİ ÖZELLEŞTİRMEK İÇİN KULLANILIR
            session.user.id = token.sub
            session.user.email = token.email

            return session
        },
        // WORK AFTER signIn | signOut with redirectTo PARAMETER
        async redirect({url, baseUrl}) {

            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }

            if (url.startsWith(baseUrl)) {
                return url
            }

            return baseUrl
        },
        // WORKS AFTER PROVIDERS'S METOT SUCCESFULLY RETURN USER
        async signIn({}) {

            // WEB CAN USE THIS FOR ROLE BASED AUTHORIZATION JUST USER SIGN IN
            return true
        },
        // WORKS USUALLY WHEN AUTH() CALLS WITH REQUEST PARAMETER
        async authorized({auth, request}) {

            // WE CAN USE THIS FOR ROLE BASED AUTHORIZATION IN MIDDLEWARE WITH EVERY REQUEST
        }
    },
    events: {

        // WORKS WHEN FIRST LOGIN WITH OAUTH AND FIRST LOGIN WITH CREDENTIALS 
        // BUT WE SHOULD CREATE USER VIA ADAPTER
        async createUser({user}) {
            console.log("Create User Event")
        },

        // WORKS WHEN USER ADD NEW OAUTH PROVIDER TO ACCOUNT
        async linkAccount({user, account, profile}) {
            console.log("Link Account Event")
        },

        // WORKS WHEN SESSION CREATE OR useSession() CALLED
        async session({session, token}) {
            console.log(session.user.id)
            console.log("Session Event")
        },

        // WORKS AFTER PROVIDERS'S METOT SUCCESFULLY RETURN USER AND signIn CALLBACK RETURN TRUE
        async signIn({user, account, profile, isNewUser}) {
            console.log("SignIn Event")
        },

        // WORKS WHEN USER CALL signOut METOT
        async signOut() {
            console.log("SignOut Event")
        },

    },
    trustHost: true
})