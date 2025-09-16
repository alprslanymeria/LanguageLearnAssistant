// NEXT AUTH
import { signOut } from "next-auth/react"
// ACTIONS
import { DeleteLiveSession } from "@/src/actions/liveSession"
// TYPES
import { HandleDropdownClickProps, HandleLogoutProps } from "@/src/components/EmailComponent/prop"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

// HANDLE LOGOUT
export async function handleLogout(params : HandleLogoutProps) {

    const {userId, pathName, setLoading, resetExcept, showAlert, dispatch} = params

    const isHydrated = GlobalStore.persist?.hasHydrated?.() ?? false

    if(!isHydrated) return

    const kese = [userId, pathName]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "EmailHandleLogout"})

        // CHECK IF REQUEST COME FROM /SESSION
        if(pathName.startsWith('/session'))
        {
            const response = await DeleteLiveSession({userId})
            
            if(response?.status != 204)
            {
                showAlert({type: "error" , title: "error" , message: response.message})

                return
            }

            showAlert({type: "success" , title: "success" , message: response.message})
        }
        
    } catch (error) {

        showAlert({type: "error" , title: "error" , message: "Unexpected error during logout!"})
        
    } finally {

        await signOut({redirect: true , redirectTo: "/auth/login"})

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