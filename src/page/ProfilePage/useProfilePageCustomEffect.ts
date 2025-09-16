// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseProfilePageCustomEffectProps } from "@/src/page/ProfilePage/prop"
// ACTIONS
import { GetProfileInfos } from "@/src/actions/profile"
import { GetLanguages } from "@/src/actions/language"


export function useProfilePageCustomEffect(params : UseProfilePageCustomEffectProps) {

    const {userId, state, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.success) {

            if (state!.message) showAlert({ type: "success", title: "success", message: state!.message })

            return
        }

        if (state!.message) showAlert({ type: "error", title: "error", message: state!.message })

    }, [state])

    
    // GET LANGUAGES
    useEffect(() => {

        const kese = [userId]

        if(kese.some(k => !k)) return

        const GET = async () => {
            
                try {
    
                    setLoading({value: true , source: "page"})
        
                    // GET USER INFOS
                    const responseOne = await GetProfileInfos({userId})
        
                    if(responseOne && responseOne.status == 500){
    
                        showAlert({type: "error" , title: "error" , message: responseOne.message})
        
                        return
                    }
    
                    dispatch({type: "SET_USER" , payload: {user: responseOne.data?.data!}})
                    dispatch({type: "SET_NAME", payload: {name: responseOne.data?.data?.name!}})
                    dispatch({type: "SET_PROFILE_IMAGE", payload: {profileImage: responseOne.data?.data?.image!}})

                    // GET LANGUAGES
                    const responseTwo = await GetLanguages()

                    if(responseOne && responseOne.status == 500){
    
                        showAlert({type: "error" , title: "error" , message: responseOne.message})
        
                        return
                    }
                    
                    dispatch({type: "SET_LANGUAGES", payload: {languages: responseTwo!.data?.data!}})
                    
                } catch (error) {
    
                    showAlert({type: "error" , title: "error" , message: "Unexpected error during Get Languages and Profile Infos!"})
    
                } finally {
    
                    setLoading({value: false})
                }
            }
        
            GET()

    }, [userId, dispatch])

}