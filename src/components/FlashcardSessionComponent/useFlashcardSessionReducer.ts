// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/FlashcardSessionComponent/prop"


const initialState: State = {
  
  total: 0,
  page: 1,
  limit: 5,
  paginatedRows: []
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_TOTAL":
      return { ...state, total: action.payload.total }
    case "SET_PAGE":
      return { ...state, page: action.payload.page }
    case "SET_LIMIT":
      return { ...state, limit: action.payload.limit, page: 1 }
    case "SET_PAGINATED_ROWS":
      return { ...state, paginatedRows: action.payload.paginatedRows }
    default:
      return state
  }
}

export function useFlashcardSessionReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
