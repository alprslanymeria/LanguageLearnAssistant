// REACT & NEXT
import { signIn } from "next-auth/react"
// TYPES
import { HandleSubmitProps } from "@/src/page/SignupPage/prop"


export async function handleSubmit(params : HandleSubmitProps) {

    const {e, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "SignupHandleSubmit"})

    const form = e.currentTarget
    const email = form.email.value
    const password = form.password.value
    const nativeLanguageId = form.nativeLanguageId.value
    const operation = form.operation.value

    await signIn("credentials", {
        email,
        password,
        nativeLanguageId,
        operation: operation,
        redirect: true,
        redirectTo: "/"
    })

    setLoading({value: false})
}