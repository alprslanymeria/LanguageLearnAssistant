// BETTER AUTH
import { HandleSubmitProps } from "@/src/page/LoginPage/prop"
// TYPES
import { SignIn } from "@/src/actions/Auth/Controller"


export async function handleSubmit( params : HandleSubmitProps) {

    const {e, dispatch, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "LoginHandleSubmit"})

    const form = e.currentTarget
    const email = form.email.value as string
    const password = form.password.value as string

    const response = await SignIn({email, password})

    if(!response.success) {

        dispatch({type: "SET_AUTH_ERROR", payload: {authError: response.message}})
    }

    setLoading({value: false})
}