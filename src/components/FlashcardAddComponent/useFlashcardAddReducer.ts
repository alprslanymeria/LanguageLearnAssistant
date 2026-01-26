// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/FlashcardAddComponent/prop"

const initialState: State = {
  
    languageId: 0,
    languages: [],
    name: ""
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_ID":
        return {...state, languageId: action.payload.languageId}
    case "SET_LANGUAGES":
        return {...state, languages: action.payload.languages}
    case "SET_NAME":
        return {...state, name: action.payload.name}
    default:
      return state
  }
}

export function useFlashcardAddReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}