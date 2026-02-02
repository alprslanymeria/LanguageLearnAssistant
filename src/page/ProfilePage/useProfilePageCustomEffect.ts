// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseProfilePageCustomEffectProps } from "@/src/page/ProfilePage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { UserDto } from "@/src/actions/User/Response"
// ACTIONS
import { GetLanguages } from "@/src/actions/Language/Controller"
import { GetProfileInfos } from "@/src/actions/User/Controller"


export function useProfilePageCustomEffect(params : UseProfilePageCustomEffectProps) {

    const {userId, state, setLoading, showAlert, dispatch} = params

    // ALERT GÖSTERME
    useEffect(() => {

        const kese = [state]

        if(kese.some(k => !k)) return

        if (state!.isSuccess) {

            showAlert({ type: "success", title: "success", message: "Profile updated successfully!" })

            return
        }

        if (state!.errorMessage) showAlert({ type: "error", title: "error", message: state!.errorMessage[0] })

    }, [state])

    
    // GET PROFILE INFOS & LANGUAGES
    useEffect(() => {

        const kese = [userId]

        if(kese.some(k => !k)) return

        const GET = async () => {
            
                try {
    
                    setLoading({value: true , source: "page"})
        
                    // GET USER INFOS
                    const responseOne = await GetProfileInfos(userId!)
    
                    if(responseOne && responseOne.status != HttpStatusCode.OK) {
                            
                        if(responseOne.shouldDisplayError) {
            
                            showAlert({type: "error" , title: "error" , message: responseOne.errorMessage![0]})
                        }
                        
                        return
                    }

                    const data : UserDto = responseOne.data as UserDto
    
                    dispatch({type: "SET_USER" , payload: {user: data}})
                    dispatch({type: "SET_NAME", payload: {name: data.name}})
                    dispatch({type: "SET_PROFILE_IMAGE", payload: {profileImage: data.image!}})

                    // GET LANGUAGES
                    const responseTwo = await GetLanguages()

                    if(responseTwo && responseTwo.status != HttpStatusCode.OK) {
                            
                        if(responseTwo.shouldDisplayError) {
            
                            showAlert({type: "error" , title: "error" , message: responseTwo.errorMessage![0]})
                        }
                        
                        return
                    }
                    
                    dispatch({type: "SET_LANGUAGES", payload: {languages: responseTwo!.data!}})
                    
                } catch (error) {
    
                    showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
    
                } finally {
    
                    setLoading({value: false})
                }
            }
        
            GET()

    }, [userId, dispatch])

}