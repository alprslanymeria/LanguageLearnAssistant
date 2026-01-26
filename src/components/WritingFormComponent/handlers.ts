// ACTIONS
import { SaveWritingRowsRequest, WritingRowItemRequest } from "@/src/actions/WritingSessionRow/Request"
import { CreateWOS } from "@/src/actions/WritingOldSession/Controller"
import { CreateWRows } from "@/src/actions/WritingSessionRow/Controller"
import { TranslateText } from "@/src/actions/Translation/Controller"
// TYPES
import { SaveWritingOldSessionRequest } from "@/src/actions/WritingOldSession/Request"
import { CalculateRateProps, CloseAndSaveProps, HandleTextSelectionProps, HandleTranslateProps } from "@/src/components/WritingFormComponent/prop"
// UTILS
import { calculateSimilarityRate, calculateSuccessRate } from "@/src/utils/helper"
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// LIBRARIES
import socket from "@/src/infrastructure/socket/socketClient"



export async function handleTextSelection(params : HandleTextSelectionProps) {

    const {updateWritingSession} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    // GET SELECTED TEXT
    const selectedText = await navigator.clipboard.readText()

    // UPDATE SELECTED TEXT
    updateWritingSession({data: {WSelectedText: selectedText}})
}

export async function handleTranslate(params : HandleTranslateProps) {

    const {userId, language, practice, sessionData, setLoading, updateWritingSession, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, language, practice, sessionData]

    if(kese.some(k => !k)) return

    try {

        if(sessionData.type === "writing") {

            setLoading({value: true , source: "WritingHandleTranslate"})

            // GET TRANSLATIONS
            const translations = await TranslateText(userId!, {

                selectedText: sessionData.data.WSelectedText!,
                practice: practice!,
                language: language!
            })
            
            // UPDATE SESSION DATA
            updateWritingSession({
                data: {
                    WTranslatedText: translations.data!,
                    WShowTranslation: true
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

    const {sessionData, oldSessionId, setLoading, updateWritingSession, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [sessionData, oldSessionId]

    if(kese.some(k => !k)) return

    if(sessionData.type === "writing" && (!sessionData.data.WInputText || !sessionData.data.WTranslatedText))
    {
        showAlert({type: "warning", title: "warning", message: "Please fill in the required fields!"})

        return
    }

    try {

        if(sessionData.type === "writing") {

            setLoading({value: true , source: "WritingCalculateRate"})

            const similarity = calculateSimilarityRate({inputOne: sessionData.data.WInputText!, inputTwo: sessionData.data.WTranslatedText!})

            showAlert({type: "info", title: "info", message: `Similarity rate: ${similarity}%`})

            //SAVED TO LOCAL STATE
            const row: WritingRowItemRequest = {

                selectedSentence: sessionData.data.WSelectedText,
                answer: sessionData.data.WInputText!,
                answerTranslate: sessionData.data.WTranslatedText!,
                similarity: similarity
            }

            // UPDATE ROWS
            updateWritingSession({rows: [...sessionData.rows, row]})
        }
        
    } catch (error) {

        showAlert({type: "error" , title: "error", message: "Unexpected error during CalculateRate!"})
        
    } finally {

        updateWritingSession({data: {
            WSelectedText: "",
            WInputText: "",
            WTranslatedText: "",
            WShowTranslation: false
        }})

        setLoading({value: false})
    }
}

export async function closeAndSave(params : CloseAndSaveProps) {

    const {userId, item, sessionData, oldSessionId, router, setLoading, updateWritingSession, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, item, sessionData, oldSessionId]

    if(kese.some(k => !k)) return

    //CALCULATE AVERAGE RATE
    const successRate = calculateSuccessRate(sessionData!.rows as WritingRowItemRequest[])

    const oldSessionRow : SaveWritingOldSessionRequest = {

        id: oldSessionId!,
        writingId: item.writingId,
        writingBookId: item.id,
        rate: successRate
    }

    const rowsToSave: SaveWritingRowsRequest = {

        writingOldSessionId: oldSessionId!,
        rows: sessionData!.rows
    }

    try {
        
        setLoading({value: true , source: "WritingCloseAndSave"})

        //SAVE OLD SESSION
        await CreateWOS(oldSessionRow)
            
        //SAVE SENTENCES
        await CreateWRows(rowsToSave)        

        //DELETE LIVE SESSION
        socket.emit("delete-live-session", {userId}, (response : any) => {

            if (response?.status !== 204) {

                showAlert({ type: "error", title: "error", message: response?.message })
                return
            }
        })

        showAlert({type: "success", title: "success", message: "Session saved successfully!"})
        
    } catch (error) {

        showAlert({type: "error", title: "error", message: "ERR: closeAndSave!"})
        
    } finally {

        // UPDATE ROWS
        updateWritingSession({rows: []})

        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }

    router.push("/")
}