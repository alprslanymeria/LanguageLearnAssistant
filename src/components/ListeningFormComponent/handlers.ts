// STORE
import { GlobalStore } from "@/src/store/globalStore"
// TYPES
import { CalculateRateProps, CloseAndSaveProps, HandleNextClickProps } from "@/src/components/ListeningFormComponent/prop"
import { ListeningOldSessionInput, ListeningSessinRowInput } from "@/src/types/actions"
// UTILS
import { calculateSuccessRate } from "@/src/utils/helper"
// ACTIONS
import { SaveOldSession } from "@/src/actions/oldSession"
import { SaveRows } from "@/src/actions/rows"
import { DeleteLiveSession } from "@/src/actions/liveSession"
import { CalculateRate } from "@/src/actions/rate"



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

            const response = await CalculateRate({inputOne: sessionData.data.LTextHeardByUser, inputTwo: correct})

            if(response.status != 200) {

                showAlert({type: "error" , title: "error", message: response.message})

                return
            }

            showAlert({type: "info", title: "info", message: `Similarity rate: ${(response.data! * 100).toFixed(2)}%`})

            // SAVED TO LOCAL STATE
            const row: ListeningSessinRowInput = {

                from: "listening",
                oldSessionId: oldSessionId!,
                listenedSentence: correct,
                answer: sessionData.data.LTextHeardByUser,
                similarity: response.data!
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


export async function closeAndSave(params : CloseAndSaveProps) {

    const {userId, sessionData, oldSessionId, item, router, updateListeningSession, setLoading, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, sessionData, oldSessionId, item]

    if(kese.some(k => !k)) return

    //CALCULATE AVERAGE RATE
    const successRate = calculateSuccessRate(sessionData!.rows as ListeningSessinRowInput[])

    const oldSessionRow: ListeningOldSessionInput = {

        from: "listening",
        oldSessionId: oldSessionId!,
        listeningId: item.listeningId,
        categoryId: item.id,
        rate: successRate
    }

    try {

        setLoading({value: true , source: "ListeningCloseAndSave"})
                
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
        updateListeningSession({rows: []})
        
        // UPDATE TOTAL
        dispatch({type: "SET_TOTAL", payload: {total: 0}})

        setLoading({value: false})
    }
    
    router.push("/")
}