// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/ProfilePage/prop"


const initialState: State = {
  
  languages: [],
  user: null,
  profileImage: null,
  name: "",
  nativeLanguageId: 0,
  state: undefined
}

function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "SET_LANGUAGES":
      return { ...state, languages: action.payload.languages }
    case "SET_USER":
      return { ...state, user: action.payload.user }
    case "SET_PROFILE_IMAGE":
      return { ...state, profileImage: action.payload.profileImage }
    case "SET_NAME":
      return { ...state, name: action.payload.name }
    case "SET_NATIVE_LANGUAGE_ID":
      return { ...state, nativeLanguageId: action.payload.nativeLanguageId }
    case "SET_STATE":
      return { ...state, state: action.payload.state }
    default:
      return state
  }
}

export function useProfilePageReducer() {

  const [states, dispatch] = useReducer(reducer, initialState)

  return { states, dispatch }
}
