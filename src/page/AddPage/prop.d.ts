// REDUCER
export type State = {

  activeComponent: string
}

export type Action =
  | { type: "SET_ACTIVE_COMPONENT"; payload: {activeComponent: string}}


// USE EFFECT
export type UseAddPageCustomEffectProps = {

  table: string | null
  dispatch: (action: { type: "SET_ACTIVE_COMPONENT"; payload: { activeComponent: string} } ) => void
}