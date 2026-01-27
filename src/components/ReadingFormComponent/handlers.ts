// ACTIONS
import { TranslateText } from "@/src/actions/Translation/Controller"
import { CreateRRows } from "@/src/actions/ReadingSessionRow/Controller"
import { CreateROS } from "@/src/actions/ReadingOldSession/Controller"
// TYPES
import { SaveReadingOldSessionRequest } from "@/src/actions/ReadingOldSession/Request"
import { ReadingRowItemRequest, SaveReadingRowsRequest } from "@/src/actions/ReadingSessionRow/Request"
import { CalculateRateProps, CloseAndSaveProps, HandleTextSelectionProps, HandleTranslateProps } from "@/src/components/ReadingFormComponent/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// LIBRARIES
import  socket  from "@/src/infrastructure/socket/socketClient"
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// UTILS
import { calculateSimilarityRate, calculateSuccessRate } from "@/src/utils/helper"


export async function handleTextSelection(params : HandleTextSelectionProps) {

    const {updateReadingSession} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    // GET SELECTED TEXT
    const selectedText = await navigator.clipboard.readText()

    // UPDATE SELECTED TEXT
    updateReadingSession({data: {RSelectedText: selectedText}})
}

export async function handleTranslate(params : HandleTranslateProps) {

    const {userId, language, practice, sessionData, updateReadingSession, setLoading, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, language, practice, sessionData]

    if(kese.some(k => !k)) return

    try {

        if(sessionData.type === "reading") {

            setLoading({value: true , source: "ReadingHandleTranslate"})

            // GET TRANSLATIONS
            const translations = await TranslateText(userId!, {

                selectedText: sessionData.data.RSelectedText!,
                practice: practice!,
                language: language!
            })

            // UPDATE SESSION DATA
            updateReadingSession({
                data: {
                    RTranslatedText: translations.data!.translatedText,
                    RShowTranslation: true
                }
            })
        }

    } catch (error) {

        showAlert({type: "error", title: "error", message: "ERR: handleTranslate!"})
        
    } finally {

        setLoading({value: false})
    }

}

export async function calculateRate(params : CalculateRateProps) {

    const {sessionData, oldSessionId, updateReadingSession, setLoading, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [sessionData, oldSessionId]

    if(kese.some(k => !k)) return

    if(sessionData.type === "reading" && (!sessionData.data.RInputText || !sessionData.data.RTranslatedText))
    {
        showAlert({type: "warning", title: "warning", message: "Please fill in the required fields!"})

        return
    }

    try {

        if(sessionData.type === "reading") {

            setLoading({value: true , source: "ReadingCalculateRate"})

            const similarity = calculateSimilarityRate({inputOne: sessionData.data.RInputText!, inputTwo: sessionData.data.RTranslatedText!})

            showAlert({type: "info", title: "info", message: `Similarity rate: ${similarity}%`})

            //SAVED TO LOCAL STATE
            const row: ReadingRowItemRequest = {

                selectedSentence: sessionData.data.RSelectedText!,
                answer: sessionData.data.RInputText!,
                answerTranslate: sessionData.data.RTranslatedText!,
                similarity: similarity
            }

            // UPDATE ROWS
            updateReadingSession({rows: [...sessionData.rows, row]})
        }

    } catch (error) {

        showAlert({type: "error" , title: "error", message: "Unexpected error during CalculateRate!"})
        
    } finally {

        updateReadingSession({data: {
            RSelectedText: "",
            RInputText: "",
            RTranslatedText: "",
            RShowTranslation: false
        }})

        setLoading({value: false})
    }
}

export async function closeAndSave(params : CloseAndSaveProps) {

    const {userId, sessionData, oldSessionId, item, router, updateReadingSession, setLoading, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, sessionData, oldSessionId, item]

    if(kese.some(k => !k)) return

    //CALCULATE AVERAGE RATE
    const successRate = calculateSuccessRate(sessionData!.rows as ReadingRowItemRequest[])

    const oldSessionRow : SaveReadingOldSessionRequest = {

        id: oldSessionId!,
        readingId: item.readingId,
        readingBookId: item.id,
        rate: successRate
    }

    const rowsToSave : SaveReadingRowsRequest = {

        readingOldSessionId: oldSessionId!,
        rows: sessionData!.rows as ReadingRowItemRequest[]
    }

    try {

        setLoading({value: true , source: "ReadingCloseAndSave"})
        
        //SAVE OLD SESSION
        await CreateROS(oldSessionRow)
            
        //SAVE SENTENCES
        await CreateRRows(rowsToSave)
    
        //DELETE LIVE SESSION
        socket.emit("delete-live-session", {userId}, (response : any) => {

            if (response?.status !== HttpStatusCode.NoContent) {

                showAlert({ type: "error", title: "error", message: response?.message })
                return
            }
        })

        showAlert({type: "success", title: "success", message: "Session saved successfully!"})

    } catch (error) {
        
        showAlert({type: "error", title: "error", message: "ERR: closeAndSave!"})

    } finally {

        // UPDATE ROWS
        updateReadingSession({rows: []})

        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }
    
    router.push("/")
}