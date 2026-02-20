// BETTER AUTH
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { auth } from "./auth"

export const authClient =  createAuthClient({

    plugins: [inferAdditionalFields<typeof auth>()]
})

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