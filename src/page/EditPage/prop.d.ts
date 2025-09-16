// REDUCER
export type State = {

  activeComponent: string
}

export type Action =
  | { type: "SET_ACTIVE_COMPONENT"; payload: {activeComponent: string}}


// USE EFFECTS
export type UseEditPageCustomEffectProps = {

    table: string | null
    dispatch: (action: Action) => void
}