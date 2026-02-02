// ACTIONS
import { CreateFOS } from "@/src/actions/FlashcardOldSession/Controller"
import { CreateFRows } from "@/src/actions/FlashcardSessionRow/Controller"
// TYPES
import { HandleClickProps, HandleCloseClickProps, HandleNextClickProps } from "@/src/components/FlashcardFormComponent/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { SaveFlashcardOldSessionRequest } from "@/src/actions/FlashcardOldSession/Request"
import { FlashcardRowItemRequest, SaveFlashcardRowsRequest } from "@/src/actions/FlashcardSessionRow/Request"
// LIBRARIES
import socket from "@/src/infrastructure/socket/socketClient"
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// UTILS
import { calculateFlashcardSuccessRate } from "@/src/utils/helper"


//HANDLE YES || NO BUTTON
export function handleClick(params : HandleClickProps) {

    const {status, sessionData, oldSessionId, updateFlashcardSession, showAlert} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [sessionData, oldSessionId]

    if(kese.some(k => !k)) return

    try {

        if(sessionData.type === "flashcard") {

            //SAVED TO LOCAL STATE
            const row : FlashcardRowItemRequest = {

                question: sessionData.data.FQuestion,
                answer: sessionData.data.FAnswer,
                status: status
            }

            // SHOW NEXT BUTTON / UPDATE ROWS / INCREASE WORD INDEX / TOGGLE IS FULL DECK SVG SHOW
            updateFlashcardSession({
                data: {
                    FShowNextAndCloseButton: true,
                    FShowYesAndNoButtons: false,
                    FWordIndex: sessionData.data.FWordIndex + 1,
                    FIsFullDeckSvgShow: !sessionData.data.FIsFullDeckSvgShow
                },
                rows: [...sessionData.rows, row]
            })
        }
        
    } catch (error) {

        showAlert({type: "error", title: "error", message: "Unexpected error!"})
    }

}


//HANDLE NEXT BUTTON
export function handleNextClick(params : HandleNextClickProps) {

    const {sessionData, showAlert, updateFlashcardSession} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [sessionData]

    if(kese.some(k => !k)) return

    try {

        if(sessionData.type === "flashcard") {

            // IF DECK WORDS FINISH
            if(sessionData.data.FWordIndex == sessionData.data.FShuffledWords.length)
            {
                updateFlashcardSession({data: {FShowYesAndNoButtons: false}})
                updateFlashcardSession({data: {FShowNextAndCloseButton: true}})

                showAlert({type: "success", title: "success", message: "All words are done!"})

                return
            }

            // CLOSE NEXT BUTTON / TOGGLE IS FULL DECK SVG SHOW / UPDATE TEXT1 & TEXT 2
            updateFlashcardSession({
                data: {
                    FShowNextAndCloseButton: false,
                    FShowYesAndNoButtons: true,
                    FIsFullDeckSvgShow: !sessionData.data.FIsFullDeckSvgShow,
                    FAnswer: sessionData.data.FShuffledWords[sessionData.data.FWordIndex].answer,
                    FQuestion: sessionData.data.FShuffledWords[sessionData.data.FWordIndex].question
                }
            })
        }
        
    } catch (error) {
        
        showAlert({type: "error", title: "error", message: "Unexpected error!"})
    }
}

//HANDLE CLOSE BUTTON
export async function handleCloseClick(params : HandleCloseClickProps) {

    const {userId, oldSessionId, sessionData, item, router, showAlert, setLoading, updateFlashcardSession, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, oldSessionId, sessionData, item]

    if(kese.some(k => !k)) return

    //CALCULATE AVERAGE RATE
    const successRate = calculateFlashcardSuccessRate(sessionData!.rows as FlashcardRowItemRequest[])

    const oldSessionRow: SaveFlashcardOldSessionRequest = {

        id: oldSessionId!,
        flashcardId: item.flashcardId,
        flashcardCategoryId: item.id,
        rate: successRate
    }

    const rowsToSave : SaveFlashcardRowsRequest = {

        flashcardOldSessionId: oldSessionId!,
        rows: sessionData!.rows as FlashcardRowItemRequest[]
    }

    try {

        setLoading({value: true , source: "HandleCloseClick"})

        if(rowsToSave.rows.length === 0) {

            showAlert({type: "warning", title: "warning", message: "You need at least one row to save it!"})

            return
        }

        //SAVE OLD SESSION
        const fosResponse = await CreateFOS(oldSessionRow)

        if(fosResponse && fosResponse.status != HttpStatusCode.Created) {

            if(fosResponse.shouldDisplayError) {

                showAlert({type: "error", title: "error", message: fosResponse.errorMessage![0]})
            }

            return
        }

        //SAVE WORDS
        const rowsResponse = await CreateFRows(rowsToSave)

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
        updateFlashcardSession({rows: []})
        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }

    router.push("/")
}