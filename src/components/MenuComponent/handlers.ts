// NEXT AUTH
import { signOut } from "next-auth/react"
// ACTIONS
import { DeleteLiveSession } from "@/src/actions/liveSession"
// TYPES
import { HandleIconClickProps, HandleLogoutProps } from "@/src/components/MenuComponent/prop"
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

            const response = await DeleteLiveSession({userId})

            if(response?.status == 500)
            {
                showAlert({type: "error" , title: "error" , message: response.message})

                return
            }

            showAlert({type: "warning" , title: "warning" , message: "The current session will be deleted!"})
        } 
    
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error during logout!"})
    
    } finally {

        dispatch({type : "TOGGLE_MENU"})

        resetExcept() // --> Hepsi NULL olsun

        await signOut({redirect: true , redirectTo: "/auth/login"})

        setLoading({value: false})
    }
}

// HANDLE ICON CLICK
export function handleIconClick(params : HandleIconClickProps) {

    const {dispatch} = params
  
    dispatch({ type: "TOGGLE_MENU" })
}