// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/LoginPage/prop"


const initialState: State = {

  authError: null
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_AUTH_ERROR":
      return { ...state, authError: action.payload.authError}
    default:
      return state
  }
}

export function useLoginReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}