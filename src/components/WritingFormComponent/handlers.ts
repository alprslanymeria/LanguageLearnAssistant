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
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"



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
            const response = await TranslateText({

                selectedText: sessionData.data.WSelectedText!,
                practice: practice!,
                language: language!
            })

            if(response && response.status != HttpStatusCode.OK) {
            
                if(response.shouldDisplayError) {
    
                    showAlert({type: "error" , title: "error" , message: response.errorMessage![0]})
                }
                
                return
            }
            
            // UPDATE SESSION DATA
            updateWritingSession({
                data: {
                    WTranslatedText: response.data!.translatedText,
                    WShowTranslation: true,
                    WShowSelectTextButton: false
                }
            })
        }

    } catch (error) {

        showAlert({type: "error", title: "error", message: "Unexpected error!"})
        
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

            showAlert({type: "info", title: "info", message: `Similarity rate: ${(similarity * 100).toFixed(2)}%`})

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

        showAlert({type: "error" , title: "error", message: "Unexpected error!"})
        
    } finally {

        updateWritingSession({data: {
            WSelectedText: "",
            WInputText: "",
            WTranslatedText: "",
            WShowTranslation: false,
            WShowSelectTextButton: true
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
        rows: sessionData!.rows as WritingRowItemRequest[]
    }

    try {
        
        setLoading({value: true , source: "WritingCloseAndSave"})

        if(rowsToSave.rows.length === 0) {

            showAlert({type: "warning", title: "warning", message: "You need at least one row to save it!"})

            return
        }

        //SAVE OLD SESSION
        const wosResponse = await CreateWOS(oldSessionRow)

        if(wosResponse && wosResponse.status != HttpStatusCode.Created) {

            if(wosResponse.shouldDisplayError) {

                showAlert({type: "error", title: "error", message: wosResponse.errorMessage![0]})
            }

            return
        }    

        //SAVE SENTENCES
        const rowsResponse = await CreateWRows(rowsToSave)

        if(rowsResponse && rowsResponse.status != HttpStatusCode.Created) {

            if(rowsResponse.shouldDisplayError) {

                showAlert({type: "error", title: "error", message: rowsResponse.errorMessage![0]})
            }

            return
        }
        
        // CHECK SOCKET SERVER CONNECTION IS ACTIVE
        if(!socket.connected) {
            
            showAlert({type: "error", title: "error", message: "Socket server connection failed!"})
            return
        }

        //DELETE LIVE SESSION
        socket.emit("delete-live-session", {userId}, (response : any) => {

            if (response?.status !== HttpStatusCode.NoContent) {

                showAlert({ type: "error", title: "error", message: response?.message })
                return
            }
        })

        showAlert({type: "success", title: "success", message: "Session saved successfully!"})
        
    } catch (error) {

        showAlert({type: "error", title: "error", message: "Unexpected error!"})
        
    } finally {

        // UPDATE ROWS
        updateWritingSession({rows: []})

        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }

    router.push("/")
}