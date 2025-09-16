// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/DetailPage/prop"
import { FlashcardCategory, ListeningCategory, ReadingBook, WritingBook } from "@prisma/client"


const initialState: State = {
  
  reading:   { item: {} as ReadingBook, contents: [] },
  writing:   { item: {} as WritingBook, contents: [] },
  listening: { item: {} as ListeningCategory, contents: [] },
  flashcard: { item: {} as FlashcardCategory, contents: [] },
  total: 0,
  page: 1,
  limit: 10
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_READING":
      return { ...state, reading: action.payload.reading }
    case "SET_WRITING":
      return { ...state, writing: action.payload.writing }
    case "SET_LISTENING":
      return { ...state, listening: action.payload.listening }
    case "SET_FLASHCARD":
      return { ...state, flashcard: action.payload.flashcard }
    case "SET_TOTAL":
      return { ...state, total: action.payload.total }
    case "SET_PAGE":
      return { ...state, page: action.payload.page }
    case "SET_LIMIT":
      return { ...state, limit: action.payload.limit, page: 1 }
    default:
      return state
  }
}


export function useDetailPageReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}