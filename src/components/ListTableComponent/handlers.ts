// ACTIONS
import { DeleteDWordItemById } from "@/src/actions/DeckWord/Controller"
import { DeleteFCategoryItemById } from "@/src/actions/FlashcardCategory/Controller"
import { DeleteRBookItemById } from "@/src/actions/ReadingBook/Controller"
import { DeleteWBookItemById } from "@/src/actions/WritingBook/Controller"
// TYPES
import { HandleCreateProps, HandleDeleteProps, HandleEditProps } from "@/src/components/ListTableComponent/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"


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

        let response;

        switch (table) {

            case "rbooks":
                response = await DeleteRBookItemById(itemId)
                break;
            case "wbooks":
                response = await DeleteWBookItemById(itemId)
                break;
            case "fcategories":
                response = await DeleteFCategoryItemById(itemId)
                break;
            case "fwords":
                response = await DeleteDWordItemById(itemId)
                break;
            default:
                break;
        }

        if(response?.status != HttpStatusCode.NoContent) {

            showAlert({type: "error", title: "error", message: response?.errorMessage![0]!})

            return
        }

        dispatch({type: "REMOVE_ITEM", payload: { id: itemId }})

        showAlert({type: "success", title: "success", message: response?.errorMessage![0]})

    } catch (error) {

        showAlert({type: "error", title: "error", message: "Unexpected error during delete!"})
        
    } finally {

        setLoading({value: false})
    }
    
}