// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/LanguagePage/prop"


const initialState: State = {
  
  practices: []
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_PRACTICES":
      return { ...state, practices: action.payload.practices }
    default:
      return state
  }
}

export function useLanguagePageReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
