// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/HomePage/prop"


const initialState: State = {

  languages: []
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGES":
      return { ...state, languages: action.payload.languages }
    default:
      return state
  }
}

export function useHomePageReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
