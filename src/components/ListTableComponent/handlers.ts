// ACTIONS
import { DeleteById } from "@/src/actions/crud"
// TYPES
import { HandleCreateProps, HandleDeleteProps, HandleEditProps } from "@/src/components/ListTableComponent/prop"


// BASE
const BASE = process.env.NEXT_PUBLIC_BASE_URL

export function handleCreate(params : HandleCreateProps) {

    const {table, router} = params

    const kese = [table]

    if(kese.some(k => !k)) return
    
    router.push(`${BASE}/add?table=${table}`)
}


export function handleEdit(params: HandleEditProps) {

    const {itemId, table, router} = params

    const kese = [itemId, table]

    if(kese.some(k => !k)) return
    
    router.push(`${BASE}/edit?id=${itemId}&table=${table}`)
}


export async function handleDelete(params : HandleDeleteProps) {

    const {itemId , table, setLoading, showAlert, dispatch} = params

    const kese = [itemId, table]

    if(kese.some(k => !k)) return

    try {

        setLoading({value: true , source: "HandleDelete"})

        const response = await DeleteById({itemId, table})

        if(response?.status != 204) {

            showAlert({type: "error", title: "error", message: response?.message})

            return
        }

        dispatch({type: "REMOVE_ITEM", payload: { id: itemId }})

        showAlert({type: "success", title: "success", message: response?.message})

    } catch (error) {

        showAlert({type: "error", title: "error", message: "Unexpected error during delete!"})
        
    } finally {

        setLoading({value: false})
    }
    
}