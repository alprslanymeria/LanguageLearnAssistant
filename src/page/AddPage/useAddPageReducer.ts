// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/AddPage/prop"


const initialState: State = {

  activeComponent: ""
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_ACTIVE_COMPONENT":
        return {...state, activeComponent: action.payload.activeComponent}
    default:
      return state
  }
}

export function useAddPageReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
