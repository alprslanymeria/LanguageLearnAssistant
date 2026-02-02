// BETTER AUTH
import { HandleSubmitProps } from "@/src/page/LoginPage/prop"
// TYPES
import { authClient } from "@/src/infrastructure/auth/auth-client"


export async function handleSubmit( params : HandleSubmitProps) {

    const {e, router, dispatch, setLoading} = params

    const kese = [e, router]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "LoginHandleSubmit"})

    const form = e.currentTarget
    const email = form.email.value as string
    const password = form.password.value as string

    // CLIENT SIDE AUTH
    await authClient.signIn.email({

            email,
            password,
            callbackURL: "/",
        },

        {
            onSuccess: () => {

                // REDIRECT TO HOME PAGE
                router.push("/")
            },

            onError: (ctx) => {

                dispatch({type: "SET_AUTH_ERROR", payload: {authError: ctx.error.message}})
            }
        })

    setLoading({value: false})
}