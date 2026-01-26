// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/ReadingAddComponent/prop"


const initialState: State = {

    languageId: 0,
    name: "",
    fileOne: null,
    fileTwo: null,
    fileError: "",
    languages: []
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_ID":
        return {...state, languageId: action.payload.languageId}
    case "SET_LANGUAGES":
        return {...state, languages: action.payload.languages}
    case "SET_NAME":
        return {...state, name: action.payload.name}
    case "SET_FILE_ONE":
        return {...state, fileOne: action.payload.fileOne}
    case "SET_FILE_TWO":
        return {...state, fileTwo: action.payload.fileTwo}
    case "SET_FILE_ERROR":
        return {...state, fileError: action.payload.fileError}
    default:
      return state
  }
}

export function useReadingAddReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}