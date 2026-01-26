// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// TYPES
import { CalculateRateProps, CloseAndSaveProps, HandleNextClickProps } from "@/src/components/ListeningFormComponent/prop"
import { ListeningRowItemRequest, SaveListeningRowsRequest } from "@/src/actions/ListeningSessionRow/Request"
import { SaveListeningOldSessionRequest } from "@/src/actions/ListeningOldSession/Request"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// UTILS
import { calculateSimilarityRate, calculateSuccessRate } from "@/src/utils/helper"
// ACTIONS
import { CreateLOS } from "@/src/actions/ListeningOldSession/Controller"
import { CreateLRows } from "@/src/actions/ListeningSessionRow/Controller"
// LIBRARIES
import socket from "@/src/infrastructure/socket/socketClient"



// NEXT CLICK
export async function handleNextClick(params: HandleNextClickProps) {

    const {sessionData, showAlert, updateListeningSession} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [sessionData]

    if(kese.some(k => !k)) return

    if(sessionData.type === "listening") {

        // IF DECK VIDEOS FINISH
        if(sessionData.data.LCurrentIndex == sessionData.data.LShuffledVideos.length)
        {
            showAlert({type: "success", title: "success", message: "All videos are done!"})

            return
        }

        // UPDATE STATES
        updateListeningSession({
            
            data: {
                LCurrentVideo: sessionData.data.LShuffledVideos[sessionData.data.LCurrentIndex].sourceUrl,
                LShowRightAnswer: false,
                LShowCalculateButton: true,
                LShowNextButton: false,
                LVideoEnded: false,
                LTextHeardByUser: ""
            }
        })
    }
}


// CALCULATE RATE
export async function calculateRate(params : CalculateRateProps) {

    const {sessionData, oldSessionId, updateListeningSession, setLoading, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return
    
    const kese = [sessionData, oldSessionId]

    if(kese.some(k => !k)) return

    if(sessionData.type ==="listening" && !sessionData.data.LTextHeardByUser)
    {
        showAlert({type: "warning", title: "warning", message: "Please fill in the required fields!"})

        return
    }

    try {

        if(sessionData.type === "listening") {

            setLoading({value: true , source: "ListeningCalculateRate"})

            const correct = sessionData.data.LShuffledVideos[sessionData.data.LCurrentIndex].correct
            const newIndex = sessionData.data.LCurrentIndex + 1

            // UPDATE STATES
            updateListeningSession({
                data: {
                    LRightAnswer: correct,
                    LCurrentIndex: newIndex
                }
            })

            const similarity = calculateSimilarityRate({inputOne: sessionData.data.LTextHeardByUser, inputTwo: correct})

            showAlert({type: "info", title: "info", message: `Similarity rate: ${similarity}%`})

            // SAVED TO LOCAL STATE
            const row : ListeningRowItemRequest = {

                listenedSentence: correct,
                answer: sessionData.data.LTextHeardByUser,
                similarity: similarity
            }

            //UPDATE ROWS
            updateListeningSession({rows: [...sessionData.rows, row]})
        }
        
    } catch (error) {
        
        showAlert({type: "error" , title: "error", message: "Unexpected error during CalculateRate!"})
    
    } finally {

        //UPDATE STATES
        updateListeningSession({
            data: {
                LShowRightAnswer: true,
                LShowCalculateButton: false,
                LShowNextButton: true
            }
        })

        setLoading({value: false})
    }
}

// CLOSE AND SAVE
export async function closeAndSave(params : CloseAndSaveProps) {

    const {userId, sessionData, oldSessionId, item, router, updateListeningSession, setLoading, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, sessionData, oldSessionId, item]

    if(kese.some(k => !k)) return

    //CALCULATE AVERAGE RATE
    const successRate = calculateSuccessRate(sessionData!.rows as ListeningRowItemRequest[])

    const oldSessionRow : SaveListeningOldSessionRequest = {

        id: oldSessionId!,
        listeningId: item.listeningId,
        listeningCategoryId: item.id,
        rate: successRate
    }

    const rowsToSave : SaveListeningRowsRequest = {

        listeningSessionId: oldSessionId!,
        rows: sessionData!.rows
    }

    try {

        setLoading({value: true , source: "ListeningCloseAndSave"})
                
        //SAVE OLD SESSION
        await CreateLOS(oldSessionRow)
            
        //SAVE SENTENCES
        await CreateLRows(rowsToSave)
    
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
        updateListeningSession({rows: []})
        
        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }
    
    router.push("/")
}