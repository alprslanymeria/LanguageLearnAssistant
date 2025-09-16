// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/EmailComponent/prop"

const initialState: State = {
  
  dropdownOpen: false
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "TOGGLE_DROPDOWN":
      return { ...state, dropdownOpen: !state.dropdownOpen }
    default:
      return state
  }
}

export function useEmailReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}