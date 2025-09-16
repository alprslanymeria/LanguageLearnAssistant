// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/AlertComponent/prop"

const initialState: State = {
  
  visible: true
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_VISIBLE":
      return { ...state, visible: action.payload.visible }
    default:
      return state
  }
}

export function useAlertReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}