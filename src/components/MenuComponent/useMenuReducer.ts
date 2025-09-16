// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/MenuComponent/prop"

const initialState: State = {
  
  isOpen: false
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

export function useMenuReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}