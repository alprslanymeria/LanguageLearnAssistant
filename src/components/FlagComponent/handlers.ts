// TYPES
import { HandleFlagClickProps, HandleStartClickProps } from "@/src/components/FlagComponent/prop"
// ACTIONS
import { CompareLanguageId } from "@/src/actions/language"



export async function handleFlagClick(params : HandleFlagClickProps) {

    const {language, dispatch} = params

    const kese = [language]

    if(kese.some(k => !k)) return

    dispatch({type : "SET_LANGUAGE_INFO" , payload: {languageInfo: {name: language.name , id: language.id}}})
}


export async function handleStartClick(params : HandleStartClickProps) {

    const {userId, languageInfo, router, showAlert, setLoading} = params

    const kese = [languageInfo, router]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "HandleStartClick"})

        //CHECK USER LOGGED IN
        if(!userId) {
            
            showAlert({type: "warning" , title: "warning" , message: "Please SignIn!"})

            return
        }

        //CHECK IS SELECTED
        if (!languageInfo.name) {

            showAlert({type: "warning" , title: "warning" , message: "Please choose a target language!"})

            return
        }

        //CHECK NATIVE LANGUAGE ID
        const response = await CompareLanguageId({userId, languageId: languageInfo.id})

        if(response && response.status == 500) {

            showAlert({type: "error" , title: "error" , message: response.message})

            return
        }

        if(response?.data == true) {

            showAlert({type: "warning" , title: "warning" , message: "Native Language can not be Target Language, Please choose another language!"})

            return
        }
        
        router.push(`/language/${languageInfo.name}`)
        
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error during start!"})
        
    } finally {

        setLoading({value: false})
    }
}