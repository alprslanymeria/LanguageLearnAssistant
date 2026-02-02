// IMPORTS
import { CreateDeckWord } from "@/src/actions/DeckWord/Controller"
import { HandleSubmitProps } from "./prop"

export async function handleSubmit( params: HandleSubmitProps) {

    const {e, dispatch, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "DeckWordAddHandleSubmit"})

    const formData = new FormData(e.currentTarget)

    const response =  await CreateDeckWord( formData )

    dispatch({type: "SET_STATE", payload: {state: response}})

    setLoading({value: false})

}