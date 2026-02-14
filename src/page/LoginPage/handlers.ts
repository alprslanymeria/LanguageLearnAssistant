// TYPES
import { HandleSubmitProps } from "@/src/page/LoginPage/prop"
// AUTH SERVICE
import { signIn } from "@/src/infrastructure/auth/authService"


export async function handleSubmit(params: HandleSubmitProps) {

    const { e, router, dispatch, setLoading, refreshSession } = params

    const kese = [e, router]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({ value: true, source: "LoginHandleSubmit" })

    try {

        const form = e.currentTarget
        const Email = form.Email.value as string
        const Password = form.Password.value as string

        const result = await signIn({ Email, Password })

        if (result.errorMessage) {

            dispatch({ type: "SET_AUTH_ERROR", payload: { authError: result.errorMessage[0] } })
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