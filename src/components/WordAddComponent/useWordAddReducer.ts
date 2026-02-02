// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/components/WordAddComponent/prop"


const initialState: State = {
    
    languageId: 0,
    categoryId: 0,
    categories: {flashcardCategoryDtos: [], totalCount: 0},
    word: "",
    answer: "",
    languages: [],
    state: undefined
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
    case "SET_WORD":
        return {...state, word: action.payload.word}
    case "SET_ANSWER":
        return {...state, answer: action.payload.answer}
    case "SET_STATE":
        return {...state, state: action.payload.state}
    default:
      return state
  }
}

export function useWordAddReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}