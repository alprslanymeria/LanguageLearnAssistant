// TYPES
import { HandleDropdownClickProps, HandleLogoutProps } from "@/src/components/EmailComponent/prop"
// BETTER AUTH
import { SignOut } from "@/src/infrastructure/auth/auth-client"
// LIBRARY
import socket from "@/src/infrastructure/socket/socketClient"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"

// HANDLE LOGOUT
export async function handleLogout(params : HandleLogoutProps) {

    const {userId, pathName, setLoading, resetExcept, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, pathName]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "EmailHandleLogout"})

        // CHECK SOCKET SERVER CONNECTION IS ACTIVE
        if(!socket.connected) {
            
            showAlert({type: "error", title: "error", message: "Socket server connection failed!"})
            return
        }

        // CHECK IF REQUEST COME FROM /SESSION
        if(pathName.startsWith('/session'))
        {
            //DELETE LIVE SESSION
            socket.emit("delete-live-session", {userId}, (response : any) => {

                if (response?.status !== 204) {

                    showAlert({ type: "error", title: "error", message: response?.message })
                    return
                }
            })

        }
        
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error!"})
        
    } finally {

        await SignOut()

        dispatch({type : "TOGGLE_DROPDOWN"})

        resetExcept() // --> Hepsi NULL olsun
    
        setLoading({value: false})
    }
}

// HANDLE DROPDOWN CLICK
export function handleDropdownClick(params : HandleDropdownClickProps) {

    const {dispatch} = params
  
    dispatch({ type: "TOGGLE_DROPDOWN"})
}