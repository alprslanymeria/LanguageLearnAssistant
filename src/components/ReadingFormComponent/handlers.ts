// ACTIONS
import { DeleteLiveSession } from "@/src/actions/liveSession"
import { SaveOldSession } from "@/src/actions/oldSession"
import { CalculateRate } from "@/src/actions/rate"
import { SaveRows } from "@/src/actions/rows"
import {TranslateText} from "@/src/actions/translate"
// TYPES
import { CalculateRateProps, CloseAndSaveProps, HandleTextSelectionProps, HandleTranslateProps } from "@/src/components/ReadingFormComponent/prop"
import { GlobalStore } from "@/src/store/globalStore"
import { ReadingOldSessionInput, ReadingSessionRowInput } from "@/src/types/actions"
// UTILS
import { calculateSuccessRate } from "@/src/utils/helper"


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
            const translations = await TranslateText({userId, language: language!, practice: practice!, selectedText: sessionData.data.RSelectedText})

            // UPDATE SESSION DATA
            updateReadingSession({
                data: {
                    RTranslatedText: translations.data!,
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

            const response = await CalculateRate({inputOne: sessionData.data.RInputText , inputTwo: sessionData.data.RTranslatedText})

            if(response.status != 200) {

                showAlert({type: "error" , title: "error", message: response.message})

                return
            }

            showAlert({type: "info", title: "info", message: `Similarity rate: ${(response.data! * 100).toFixed(2)}%`})

            //SAVED TO LOCAL STATE
            const row: ReadingSessionRowInput = {

                from : "reading",
                oldSessionId: oldSessionId!,
                selectedSentence: sessionData.data.RSelectedText,
                answer: sessionData.data.RInputText,
                answerTranslate: sessionData.data.RTranslatedText,
                similarity: response.data!
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
    const successRate = calculateSuccessRate(sessionData!.rows as ReadingSessionRowInput[])

    const oldSessionRow: ReadingOldSessionInput = {

        from : "reading",
        oldSessionId: oldSessionId!,
        readingId: item.readingId,
        bookId: item.id,
        rate: successRate
    }

    try {

        setLoading({value: true , source: "ReadingCloseAndSave"})
        
        //SAVE OLD SESSION
        await SaveOldSession({oldSessionRow})
            
        //SAVE SENTENCES
        await SaveRows({rows: sessionData!.rows})
    
        //DELETE LIVE SESSION
        await DeleteLiveSession({userId})

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