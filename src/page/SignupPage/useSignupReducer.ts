// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/SignupPage/prop"


const initialState: State = {

  languages: [],
  authError: null
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGES":
      return { ...state, languages: action.payload.languages }
    case "SET_AUTH_ERROR":
      return { ...state, authError: action.payload.authError}
    default:
      return state
  }
}

export function useSignupReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
