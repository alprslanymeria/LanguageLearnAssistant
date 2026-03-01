// TYPES
import { HandleChooseProps, HandleSvgClickProps } from "@/src/page/CreatePage/prop"
//3RD PARTY
import { v4 as uuidv4 } from 'uuid'
// ACTIONS
import { encryptSessionId } from "@/src/actions/EncryptSessionId"
// INFRA
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
import  socket  from "@/src/infrastructure/socket/socketClient"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"


export async function handleSvgClick(params : HandleSvgClickProps) {

    const {item, setSelectedItemId} = params

    const hasHydrated = GlobalStore.getState().HasHydrated

    if(!hasHydrated) return

    const kese = [item]

    if(kese.some(k => !k)) return

    setSelectedItemId(item.id)
}


export async function handleChoose(params : HandleChooseProps) {

    const {userId, selectedItemId, router, setLoading, showAlert, setOldSessionId} = params

    const hasHydrated = GlobalStore.getState().HasHydrated

    if(!hasHydrated) return

    const kese = [userId]

    if(kese.some(k => !k)) return

    // CHECK IS ITEM SELECTED
    if (!selectedItemId) {

        showAlert({type: "warning", title: "warning", message: "Please choose an item!"})

        setLoading({value: false})

        return
    }

    // CREATE SESSION ID
    const liveSessionId = uuidv4()
    setOldSessionId(liveSessionId)

    // CHECK SOCKET SERVER CONNECTION IS ACTIVE
    if(!socket.connected) {
        
        showAlert({type: "error", title: "error", message: "Socket server connection failed!"})
        return
    }

    try {

        setLoading({value: true , source: "ChooseHandler"})

        // ENCRYPT SESSION ID ON SERVER SIDE (BEFORE SOCKET CALL)
        const safeUrl = await encryptSessionId(liveSessionId)

        //LIVESESSION İÇERİSİNE KAYDET
        socket.emit("create-live-session", {userId, liveSessionId}, (response : any) => {

            if (response?.status !== HttpStatusCode.Created) {

                showAlert({ type: "error", title: "error", message: response?.message })
                
                socket.disconnect()
                return
            }

            //SESSION SAYFASINA YÖNLENDİR
            router.push(`/session?id=${safeUrl}`)
        })

        
    } catch (error) {
        
        showAlert({type: "error", title: "error", message: "Unexpected error!"})

    } finally {

        setLoading({value: false})
    }
}