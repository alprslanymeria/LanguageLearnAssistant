// REACT & NEXT
// import router from "next/router"
// BETTER AUTH
import { createAuthClient } from "better-auth/react"

export const authClient =  createAuthClient()

// SIGN IN WITH GOOGLE
export async function SignInWithGoogle() {

    await authClient.signIn.social({

        provider: "google",
        callbackURL: "/"
    })
}

// SIGN OUT
export async function SignOut() {

    await authClient.signOut()
}