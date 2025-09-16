// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UsePracticePageCustomEffect } from "@/src/page/PracticePage/prop"
// ACTIONS
import {GetOldSessions} from "@/src/actions/oldSession"


export function usePracticePageCustomEffect(params: UsePracticePageCustomEffect) {

    const {userId, language, practice, hasHydrated, state, router, setPractice, setOldSessions, setLoading, showAlert, resetExcept, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {
    
        const kese = [language]

        if(kese.some(k => k === null)) router.push("/")

    }, [language])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [userId, language, practice]

        if(kese.some(k => !k)) return
    
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetOldSessions({userId, language, practice, page: state.page, limit: state.limit})

                if(response && response.status == 500) {

                    showAlert({type: "error" , title: "error" , message: response.message})

                    return
                }

                if(response.data != null) {

                    setOldSessions(response.data.data.data)
                    dispatch({ type: "SET_TOTAL", payload: { total: response.data.data.total } })
                }
                    
                
                
            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: `Unexpected error during Get Oldsessions!`})

            } finally {

                setPractice(practice!)
                    
                setLoading({value: false})
            }
        }

        GET()

    }, [userId, language, practice, hasHydrated, state.page, state.limit])


    useEffect(() => {

        if(!hasHydrated) return

        return () => {

            resetExcept(["Language", "Practice", "OldSessions"])
        }
        
    }, [hasHydrated, state.page, state.limit])
}