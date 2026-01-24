// ACTIONS
import { SaveOldSession } from "@/src/actions/oldSession"
import { SaveRows } from "@/src/actions/rows"
import { CalculateRate } from "@/src/actions/rate"
import { TranslateText } from "@/src/actions/translate"
// TYPES
import { CalculateRateProps, CloseAndSaveProps, HandleTextSelectionProps, HandleTranslateProps } from "@/src/components/WritingFormComponent/prop"
import { WritingOldSessionInput, WritingSessionRowInput } from "@/src/types/actions"
// UTILS
import { calculateSuccessRate } from "@/src/utils/helper"
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
            const translations = await TranslateText({userId, language: language!, practice: practice!, selectedText: sessionData.data.WSelectedText })
            
            // UPDATE SESSION DATA
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

            const response = await CalculateRate({inputOne: sessionData.data.WInputText , inputTwo: sessionData.data.WTranslatedText})

            if(response.status != 200) {

                showAlert({type: "error" , title: "error", message: response.message})

                return
            }

            showAlert({type: "info", title: "info", message: `Similarity rate: ${(response.data! * 100).toFixed(2)}%`})

            //SAVED TO LOCAL STATE
            const row: WritingSessionRowInput = {

                from: "writing",
                oldSessionId: oldSessionId!,
                selectedSentence: sessionData.data.WSelectedText,
                answer: sessionData.data.WInputText,
                answerTranslate: sessionData.data.WTranslatedText,
                similarity: response.data!
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
    const successRate = calculateSuccessRate(sessionData!.rows as WritingSessionRowInput[])

    const oldSessionRow: WritingOldSessionInput = {

        from : "writing",
        oldSessionId: oldSessionId!,
        writingId: item.writingId,
        bookId: item.id,
        rate: successRate
    }

    try {
        
        setLoading({value: true , source: "WritingCloseAndSave"})

        //SAVE OLD SESSION
        await SaveOldSession({oldSessionRow})
            
        //SAVE SENTENCES
        await SaveRows({rows: sessionData!.rows})        

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