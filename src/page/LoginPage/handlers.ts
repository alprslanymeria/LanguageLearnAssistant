// NEXT AUTH
import { signIn } from "next-auth/react"
// TYPES
import { HandleSubmitProps } from "@/src/page/LoginPage/prop"


export async function handleSubmit( params : HandleSubmitProps) {

    const {e, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "LoginHandleSubmit"})

    const form = e.currentTarget
    const email = form.email.value
    const password = form.password.value
    const operation = form.operation.value

    await signIn("credentials", {
        email,
        password,
        operation: operation,
        redirect: true,
        redirectTo: "/"
    })

    setLoading({value: false})
}