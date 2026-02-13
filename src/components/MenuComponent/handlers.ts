// TYPES
import { HandleIconClickProps, HandleLogoutProps } from "@/src/components/MenuComponent/prop"
// AUTH SERVICE
import { signOut } from "@/src/infrastructure/auth/authService"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
// LIBRARY
import socket from "@/src/infrastructure/socket/socketClient"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"

// HANDLE LOGOUT
export async function handleLogout(params : HandleLogoutProps) {

    const {userId, pathName, setLoading, showAlert, refreshSession, resetExcept, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, pathName]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "MenuHandleLogout"})

        // CHECK IF REQUEST COME FROM /SESSION
        if(pathName!.startsWith('/session')) {

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

            showAlert({type: "warning" , title: "warning" , message: "The current session will be deleted!"})
        } 
    
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
    
    } finally {

        dispatch({type : "TOGGLE_MENU"})

        resetExcept() // --> Hepsi NULL olsun

        await signOut()

        // REFRESH SESSION TO UPDATE UI
        await refreshSession()

        setLoading({value: false})
    }
}

// HANDLE ICON CLICK
export function handleIconClick(params : HandleIconClickProps) {

    const {dispatch} = params
  
    dispatch({ type: "TOGGLE_MENU" })
}