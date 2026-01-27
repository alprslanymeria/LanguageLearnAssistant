// REACT & NEXT
import { HandleSubmitProps } from "@/src/page/SignupPage/prop"
// TYPES
import { SignUp } from "@/src/actions/Auth/Controller"


export async function handleSubmit(params : HandleSubmitProps) {

    const {e, dispatch, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "SignupHandleSubmit"})

    const form = e.currentTarget
    const email = form.email.value as string
    const password = form.password.value as string
    const nativeLanguageId = Number(form.nativeLanguageId.value)

    const response = await SignUp({name: "test_user", email, password, nativeLanguageId})

    if(response.isFail) {

        dispatch({type: "SET_AUTH_ERROR", payload: {authError: response.errorMessage![0]}})
    }

    setLoading({value: false})

    return
}