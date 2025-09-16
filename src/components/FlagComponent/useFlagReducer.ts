// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/FlagComponent/prop"


const initialState: State = {

  languageInfo: {name: "", id: 0}
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_INFO":
      return { ...state, languageInfo: action.payload.languageInfo }
    default:
      return state
  }
}

export function useFlagReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}