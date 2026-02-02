// IMPORTS
import { UpdateFlashcardCategory } from "@/src/actions/FlashcardCategory/Controller"
import { HandleSubmitProps } from "./prop"

export async function handleSubmit( params: HandleSubmitProps) {

    const {e, dispatch, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "FlashcardEditHandleSubmit"})

    const formData = new FormData(e.currentTarget)

    const response =  await UpdateFlashcardCategory( formData )

    dispatch({type: "SET_STATE", payload: {state: response}})

    setLoading({value: false})

}