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
        const Email = form.Email.value as string
        const Password = form.Password.value as string
        const NativeLanguageId = Number(form.NativeLanguageId.value)

        // SIGN UP
        const signUpResult = await signUp({
            UserName: Email.split("@")[0],
            Email,
            Password,
            NativeLanguageId
        })

        if (signUpResult.errorMessage) {

            dispatch({ type: "SET_AUTH_ERROR", payload: { authError: signUpResult.errorMessage[0] } })
            return
        }

        // AUTO SIGN IN AFTER SUCCESSFUL SIGNUP
        const signInResult = await signIn({ Email, Password })

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