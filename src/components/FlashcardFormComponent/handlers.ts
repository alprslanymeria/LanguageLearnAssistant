// ACTIONS
import { DeleteLiveSession } from "@/src/actions/liveSession"
import { SaveOldSession } from "@/src/actions/oldSession"
import { SaveRows } from "@/src/actions/rows"
// TYPES
import { HandleClickProps, HandleCloseClickProps, HandleNextClickProps } from "@/src/components/FlashcardFormComponent/prop"
import { GlobalStore } from "@/src/store/globalStore"
import { FlashcardOldSessionInput, FlashcardSessionRowInput } from "@/src/types/actions"
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
            const row: FlashcardSessionRowInput = {

                from: "flashcard",
                oldSessionId: oldSessionId!,
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

        showAlert({type: "error", title: "error", message: "ERR: HandleClick!"})
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
        
        showAlert({type: "error", title: "error", message: "ERR: HandleNextClick!"})
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
    const successRate = calculateFlashcardSuccessRate(sessionData!.rows as FlashcardSessionRowInput[])

    const oldSessionRow: FlashcardOldSessionInput = {

        from: "flashcard",
        oldSessionId: oldSessionId!,
        flashcardId: item.flashcardId,
        categoryId: item.id,
        rate: successRate
    }

    try {

        setLoading({value: true , source: "HandleCloseClick"})

        //SAVE OLD SESSION
        await SaveOldSession({oldSessionRow})

        //SAVE WORDS
        await SaveRows({rows: sessionData!.rows})

        //DELETE LIVE SESSION
        await DeleteLiveSession({userId})

        showAlert({type: "success", title: "success", message: "Session saved successfully!"})
        
    } catch (error) {

        showAlert({type: "error", title: "error", message: "ERR: handleCloseClick!"})
        
    } finally {

        // UPDATE ROWS
        updateFlashcardSession({rows: []})
        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }

    router.push("/")
}