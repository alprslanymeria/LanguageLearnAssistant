// 3RD PATY
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// LIBRARIES
import { prisma } from "./lib/prisma";
import { comparePassword } from "./lib/bcrypt";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
    
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [

        //WORKS ON SignIn() CALL
        Credentials({
             async authorize(credentials) {

                if(credentials == null) return null

                try {
                    
                    //CHECK USER CREDNTIALS
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    })

                    if (user == null) throw new Error("Invalid email or password")

                    const isPasswordMatch = await comparePassword(credentials.password, user.password)

                    if (!isPasswordMatch) throw new Error("Invalid email or password")

                    return user

                } catch (error) {
                    
                    return null
                }
             }  
        })
    ],
    callbacks: {
        // WORKS AFTER USER LOGIN FOR CREATE TOKEN
        async jwt({token, user}) {
            
            if (user) {
                token.userId = user.userId
                token.email = user.email
            }
            return token

        },
        // WORKS ON AUTH CALL
        async session({session, token}) {

            session.user.userId = token.userId
            session.user.email = token.email
            return session
        }
    },
    trustHost: true
})