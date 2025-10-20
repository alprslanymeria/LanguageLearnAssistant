// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseCreatePageCustomEffectProps } from "@/src/page/CreatePage/prop"
// ACTIONS
import GetCreateItems from "@/src/actions/utils"


//BASE
const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"


export function useCreatePageCustomEffect(params: UseCreatePageCustomEffectProps) {

    const {userId, language, practice, router, hasHydrated, oldSessions, createItems, setCreateItems, setLoading, showAlert, resetExcept} = params

    // USE EFFECT ONE
    useEffect(() => {

        if (!hasHydrated) return

        const kese = [language, practice, oldSessions]

        if(kese.some(k => k === null)) router.push("/")

    }, [language, practice, oldSessions, hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if (!hasHydrated) return

        const kese = [userId, language, practice]

        if(kese.some(k => !k)) return
    
        // GET CREATE ITEMS
        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                const response = await GetCreateItems({userId, language, practice})

                if(response && response.status == 500) {

                    showAlert({type: "error", title: "error" , message: response.message})
                    return
                }

                if(response.data !== null)
                    
                setCreateItems(response?.data.data)
                
            } catch (error) {
                
                showAlert({type: "error", title: "error" , message: "Unexpected error during Get Create Items!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [userId, language, practice, hasHydrated])


    // USE EFFECT THREE
    useEffect(() => {

        if (!hasHydrated) return

        if(createItems?.length === 0) {

            setTimeout(() => { router.push(`${BASE}/`) }, 2000)
            showAlert({type: "info", title: "info", message: "NO ITEMS FOUND!"})

            return
        }

    }, [createItems, hasHydrated])


    // USE EFFECT FOUR
    useEffect(() => {

        if(!hasHydrated) return

        return () => {
            resetExcept(["Language", "Practice", "OldSessions", "CreateItems", "OldSessionId", "SelectedItemId"])
        }

    }, [hasHydrated])
}