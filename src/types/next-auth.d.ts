import NextAuth from "next-auth";
import "next-auth/jwt"

declare module "next-auth" {

    interface Session {

        user: {
            userId?: string | null | undefined
            email?: string | null | undefined
        }
    };
}

declare module "next-auth/jwt" {

    interface JWT {
        userId?: string | null
        email?: string | null
    };
}