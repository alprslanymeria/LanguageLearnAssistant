// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/FlashcardAddOrEditComponent/prop"

const initialState: State = {
  
    languageId: 0,
    languages: [],
    inputOne: ""
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_ID":
        return {...state, languageId: action.payload.languageId}
    case "SET_LANGUAGES":
        return {...state, languages: action.payload.languages}
    case "SET_INPUT_ONE":
        return {...state, inputOne: action.payload.inputOne}
    default:
      return state
  }
}

export function useFlashcardAddOrEditReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}