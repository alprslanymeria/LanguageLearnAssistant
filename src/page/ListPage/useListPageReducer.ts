// REACT & NEXT
import { useReducer } from "react"
// TYPES
import { Action, State } from "@/src/page/ListPage/prop"


const initialState: State = {

  items: [],
  contents: [],
  columnNames: [],
  table: "",
  total: 0,
  page: 1,
  limit: 10

}

function reducer(state: State, action: Action) : State {

  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload.items}
    case "SET_CONTENTS":
      return { ...state, contents: action.payload.contents}
    case "SET_COLUMN_NAMES":
      return { ...state, columnNames: action.payload.columnNames}
    case "SET_TABLE":
      return { ...state, table: action.payload.table}
    case "REMOVE_ITEM": {
      
      const id = action.payload.id
      
      return { ...state, items: state.items.filter((it: any) => it.id !== id) }
    }
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

export function useListPageReducer() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}