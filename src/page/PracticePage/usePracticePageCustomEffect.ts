// REACT & NEXT
import { useEffect } from "react"
// TYPES
import { UsePracticePageCustomEffect } from "@/src/page/PracticePage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { FlashcardOldSessionWithTotalCount } from "@/src/actions/FlashcardOldSession/Response"
// ACTIONS
import { GetFOSWithPaging } from "@/src/actions/FlashcardOldSession/Controller"
import { GetROSWithPaging } from "@/src/actions/ReadingOldSession/Controller"
import { GetWOSWithPaging } from "@/src/actions/WritingOldSession/Controller"
import { GetLOSWithPaging } from "@/src/actions/ListeningOldSession/Controller"


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

                let response;

                switch (practice) {
                    case "flashcard":
                        response = await GetFOSWithPaging(userId!, {page: state.page, pageSize: state.limit})
                        break;
                    case "reading":
                        response = await GetROSWithPaging(userId!, {page: state.page, pageSize: state.limit})
                        break;
                    case "writing":
                        response = await GetWOSWithPaging(userId!, {page: state.page, pageSize: state.limit})
                        break;
                    case "listening":
                        response = await GetLOSWithPaging(userId!, {page: state.page, pageSize: state.limit})
                        break;
                
                    default:
                        break;
                }

                if(response && response.status != HttpStatusCode.OK) {

                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})

                    return
                } 

                const data: PagedResult<FlashcardOldSessionWithTotalCount> = response?.data as PagedResult<FlashcardOldSessionWithTotalCount>

                setOldSessions(data.items[0].flashcardOldSessionDtos)
                dispatch({type: "SET_TOTAL", payload: {total: data.items[0].totalCount}})              
                
                
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