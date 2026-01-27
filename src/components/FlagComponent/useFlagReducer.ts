// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/FlagComponent/prop"


const initialState: State = {

  languageName: ""
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_NAME":
      return { ...state, languageName: action.payload.languageName }
    default:
      return state
  }
}

export function useFlagReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}