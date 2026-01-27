// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UseCreatePageCustomEffectProps } from "@/src/page/CreatePage/prop"
import { GetRBookCreateItems } from "@/src/actions/ReadingBook/Controller"
import { GetWBookCreateItems } from "@/src/actions/WritingBook/Controller"
import { GetFCategoryCreateItems } from "@/src/actions/FlashcardCategory/Controller"
import { GetLCategoryCreateItems } from "@/src/actions/ListeningCategory/Controller"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// ACTIONS


//BASE
const BASE = process.env.NEXT_PUBLIC_BASE_URL


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

                let response;

                switch (practice) {
                    case "reading":
                        response = await GetRBookCreateItems(userId!, language!, practice)
                        break;
                    case "writing":
                        response = await GetWBookCreateItems(userId!, language!, practice)
                        break;
                    case "listening":
                        response = await GetLCategoryCreateItems(userId!, language!, practice)
                        break;
                    case "flashcard":
                        response = await GetFCategoryCreateItems(userId!, language!, practice)
                        break;
                
                    default:
                        break;
                }

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error", title: "error" , message: response.errorMessage![0]})
                    return
                }
                    
                setCreateItems(response!.data!)
                
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