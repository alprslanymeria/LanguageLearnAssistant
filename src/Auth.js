// 3RD PATY
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// LIBRARIES
import { prisma } from "./lib/prisma";
// UTILS
import { comparePassword } from "./utils/utils";

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

        Credentials({
             async authorize(credentials) {

                if(credentials == null) return null;

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
        async jwt({token, user}) {
            
            if (user) {
                token.userId = user.userId
                token.email = user.email
            }
            return token

        },
        async session({session, token}) {

            session.user.userId = token.userId
            session.user.email = token.email
            return session
        }
    }
})