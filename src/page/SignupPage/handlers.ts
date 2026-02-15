// TYPES
import { HandleSubmitProps } from "@/src/page/SignupPage/prop"
// AUTH SERVICE
import { signIn, signUp } from "@/src/infrastructure/auth/authService"


export async function handleSubmit(params: HandleSubmitProps) {

    const { e, router, dispatch, setLoading, refreshSession } = params

    const kese = [e, router]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({ value: true, source: "SignupHandleSubmit" })

    try {

        const form = e.currentTarget
        const email = form.email.value as string
        const password = form.password.value as string
        const nativeLanguageId = Number(form.nativeLanguageId.value)

        // SIGN UP
        const signUpResult = await signUp({

            userName: email.split("@")[0],
            email,
            password,
            nativeLanguageId
        })

        if (signUpResult.errorMessage) {

            dispatch({ type: "SET_AUTH_ERROR", payload: { authError: signUpResult.errorMessage[0] } })
            return
        }

        // AUTO SIGN IN AFTER SUCCESSFUL SIGNUP
        const signInResult = await signIn({ email, password })

        if (signInResult.errorMessage) {

            // SIGNUP SUCCEEDED BUT AUTO-LOGIN FAILED, REDIRECT TO LOGIN PAGE
            router.push("/auth/login")
            return
        }

        // REFRESH SESSION BEFORE REDIRECT
        await refreshSession()

        // REDIRECT TO HOME PAGE
        router.push("/")

    } catch {

        dispatch({ type: "SET_AUTH_ERROR", payload: { authError: "An unexpected error occurred" } })

    } finally {

        setLoading({ value: false })
    }
}