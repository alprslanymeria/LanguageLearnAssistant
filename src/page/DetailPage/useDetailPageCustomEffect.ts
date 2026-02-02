// REACT & NEXT
import { useEffect } from "react"
// ACTIONS
import { GetRRowsByIdWithPaging } from "@/src/actions/ReadingSessionRow/Controller"
import { GetWRowsByIdWithPaging } from "@/src/actions/WritingSessionRow/Controller"
import { GetFRowsByIdWithPaging } from "@/src/actions/FlashcardSessionRow/Controller"
import { GetLRowsByIdWithPaging } from "@/src/actions/ListeningSessionRow/Controller"
// TYPES
import { UseDetailPageCustomEffectProps } from "@/src/page/DetailPage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ReadingRowsResponse } from "@/src/actions/ReadingSessionRow/Response"
import { WritingRowsResponse } from "@/src/actions/WritingSessionRow/Response"
import { FlashcardRowsResponse } from "@/src/actions/FlashcardSessionRow/Response"
import { ListeningRowsResponse } from "@/src/actions/ListeningSessionRow/Response"



export function useDetailPageCustomEffect(params : UseDetailPageCustomEffectProps) {

    const {userId, language, practice, oldSessions, oldSessionId, hasHydrated, router, state, setLoading, showAlert, resetExcept, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [language, practice, oldSessions]

        if(kese.some(k => k === null)) router.push("/")

    }, [ language, practice, oldSessions , hasHydrated])


    // USE EFFECT TWO
    useEffect(() => {

        if(!hasHydrated) return

        const kese = [userId, language, practice, oldSessionId]

        if(kese.some(k => !k)) return

        const GET = async () => {

            try {

                setLoading({value: true , source: "page"})

                let response;
                let total;

                switch (practice) {
                    case "reading":
                        response = await GetRRowsByIdWithPaging(oldSessionId!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                                                
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }
                        
                        const readingRowsResponse : ReadingRowsResponse = response.data as ReadingRowsResponse
                        const readingRowDtos = readingRowsResponse.contents
                        const readingBook = readingRowsResponse.item
                        total = readingRowsResponse.total

                        dispatch({type: "SET_READING" , payload: {reading: {item: readingBook , contents: readingRowDtos}}})
                        dispatch({type: "SET_TOTAL", payload: {total: total}})

                        break;
                    case "writing":
                        response = await GetWRowsByIdWithPaging(oldSessionId!, {page: state.page, pageSize: state.limit})

                        if(response && response.status != HttpStatusCode.OK) {
                                                
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        const writingRowsResponse : WritingRowsResponse = response.data as WritingRowsResponse
                        const writingRowDtos = writingRowsResponse.contents
                        const writingBook = writingRowsResponse.item
                        total = writingRowsResponse.total

                        dispatch({type: "SET_WRITING" , payload: {writing: {item: writingBook , contents: writingRowDtos}}})
                        dispatch({type: "SET_TOTAL", payload: {total: total}})

                        break;
                    case "flashcard":
                        response = await GetFRowsByIdWithPaging(oldSessionId!, {page: state.page, pageSize: state.limit})
                        
                        if(response && response.status != HttpStatusCode.OK) {
                                                
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        const flashcardRowsResponse : FlashcardRowsResponse = response.data as FlashcardRowsResponse
                        const flashcardRowDtos = flashcardRowsResponse.contents
                        const flashcardCategory = flashcardRowsResponse.item
                        total = flashcardRowsResponse.total

                        dispatch({type: "SET_FLASHCARD" , payload: {flashcard: {item: flashcardCategory , contents: flashcardRowDtos}}})
                        dispatch({type: "SET_TOTAL", payload: {total: total}})

                        break;
                    case "listening":
                        response = await GetLRowsByIdWithPaging(oldSessionId!, {page: state.page, pageSize: state.limit})
                        
                        if(response && response.status != HttpStatusCode.OK) {
                                                
                            if(response.shouldDisplayError) showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                            
                            return
                        }

                        const listeningRowsResponse : ListeningRowsResponse = response.data as ListeningRowsResponse
                        const listeningRowDtos = listeningRowsResponse.contents
                        const listeningCategory = listeningRowsResponse.item
                        total = listeningRowsResponse.total

                        dispatch({type: "SET_LISTENING" , payload: {listening: {item: listeningCategory , contents: listeningRowDtos}}})
                        dispatch({type: "SET_TOTAL", payload: {total: total}})

                        break;
                    default:
                        break;
                }
                
            } catch (error) {

                showAlert({type: "error", title: "error" , message: "Unexpected error!"})

            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [userId, language, practice, oldSessionId, hasHydrated, state.page, state.limit, dispatch])


    // USE EFFECT THREE
    useEffect(() => {
        
        if(!hasHydrated) return

        return () => {
            resetExcept(["Language", "Practice", "OldSessions"])
        }

    }, [hasHydrated])


}