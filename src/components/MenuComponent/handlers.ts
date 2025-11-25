// TYPES
import { HandleIconClickProps, HandleLogoutProps } from "@/src/components/MenuComponent/prop"
// BETTER AUTH
import { SignOut } from "@/src/lib/auth-client"
// LIBRARY
import socket from "@/src/lib/socketClient"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

// HANDLE LOGOUT
export async function handleLogout(params : HandleLogoutProps) {

    const {userId, pathName, setLoading, showAlert, resetExcept, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, pathName]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "MenuHandleLogout"})

        // CHECK IF REQUEST COME FROM /SESSION
        if(pathName!.startsWith('/session')){

            //DELETE LIVE SESSION
            socket.emit("delete-live-session", {userId}, (response : any) => {

                if (response?.status !== 204) {

                    showAlert({ type: "error", title: "error", message: response?.message })
                    return
                }
            })

            showAlert({type: "warning" , title: "warning" , message: "The current session will be deleted!"})
        } 
    
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error during logout!"})
    
    } finally {

        dispatch({type : "TOGGLE_MENU"})

        resetExcept() // --> Hepsi NULL olsun

        await SignOut()

        setLoading({value: false})
    }
}

// HANDLE ICON CLICK
export function handleIconClick(params : HandleIconClickProps) {

    const {dispatch} = params
  
    dispatch({ type: "TOGGLE_MENU" })
}