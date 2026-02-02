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
import { ReadingOldSessionWithTotalCount } from "@/src/actions/ReadingOldSession/Response"
import { WritingOldSessionWithTotalCount } from "@/src/actions/WritingOldSession/Response"
import { ListeningOldSessionWithTotalCount } from "@/src/actions/ListeningOldSession/Response"


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
                let data;

                switch (practice) {
                    case "flashcard":
                        response = await GetFOSWithPaging(userId!, language!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                            
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        data = response?.data as PagedResult<FlashcardOldSessionWithTotalCount>

                        setOldSessions(data.items[0].flashcardOldSessionDtos)
                        dispatch({type: "SET_TOTAL", payload: {total: data.items[0].totalCount}})    

                        break;
                    case "reading":
                        response = await GetROSWithPaging(userId!, language!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                            
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        data = response?.data as PagedResult<ReadingOldSessionWithTotalCount>

                        setOldSessions(data.items[0].readingOldSessionDtos)
                        dispatch({type: "SET_TOTAL", payload: {total: data.items[0].totalCount}})

                        break;
                    case "writing":
                        response = await GetWOSWithPaging(userId!, language!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                            
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        data = response?.data as PagedResult<WritingOldSessionWithTotalCount>

                        setOldSessions(data.items[0].writingOldSessionDtos)
                        dispatch({type: "SET_TOTAL", payload: {total: data.items[0].totalCount}})

                        break;
                    case "listening":
                        response = await GetLOSWithPaging(userId!, language!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                            
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        data = response?.data as PagedResult<ListeningOldSessionWithTotalCount>
                        setOldSessions(data.items[0].listeningOldSessionDtos)
                        dispatch({type: "SET_TOTAL", payload: {total: data.items[0].totalCount}})

                        break;
                
                    default:
                        break;
                }
                
            } catch (error) {
                
                showAlert({type: "error" , title: "error" , message: `Unexpected error!`})

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