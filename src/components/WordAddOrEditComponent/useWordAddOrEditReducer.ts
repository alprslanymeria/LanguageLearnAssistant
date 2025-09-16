// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/WordAddOrEditComponent/prop"


const initialState: State = {
    
    languageId: 1,
    categoryId: 0,
    categories: [],
    inputOne: "",
    inputTwo: "",
    languages: []
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGE_ID":
        return {...state, languageId: action.payload.languageId}
    case "SET_LANGUAGES":
        return {...state, languages: action.payload.languages}
    case "SET_CATEGORY_ID":
        return {...state, categoryId: action.payload.categoryId}
    case "SET_FLASHCARD_CATEGORIES":
        return {...state, categories: action.payload.categories}
    case "SET_INPUT_ONE":
        return {...state, inputOne: action.payload.inputOne}
    case "SET_INPUT_TWO":
        return {...state, inputTwo: action.payload.inputTwo}
    default:
      return state
  }
}

export function useWordAddOrEditReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}