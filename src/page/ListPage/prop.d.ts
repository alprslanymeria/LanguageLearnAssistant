// TYPES
import { JSX } from "react"
import { DeckWordDto } from "@/src/actions/DeckWord/Response"
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { FlashcardCategoryDto } from "@/src/actions/FlashcardCategory/Response"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"

export type Item = ReadingBookDto | WritingBookDto | FlashcardCategoryDto | DeckWordDto

export type State<T extends Item = Item> = {

  table: string
  columnNames: string[]
  items: T[]
  contents: Array<(item: T) => JSX.Element>
  total: number
  page: number
  limit: number

}

export type Action<T extends Item = Item> =
  | { type: "SET_ITEMS"; payload: {items: T[] }}
  | { type: "SET_CONTENTS"; payload: {contents: Array<(item: T) => JSX.Element> }}
  | { type: "SET_COLUMN_NAMES"; payload: {columnNames: string[]}}
  | { type: "SET_TABLE"; payload: {table: string}}
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "SET_TOTAL"; payload: {total: number}}
  | { type: "SET_PAGE"; payload: {page: number}}
  | { type: "SET_LIMIT"; payload: {limit: number}}

// USE EFFECTS

export type UseListPageCustomEffectProps<T extends Item = Item> = {
  
  userId: string | undefined
  table: string | null
  state: State
  dispatch: (action: Action<T>) => void
  showAlert: (props: ShowAlertProps) => void
  setLoading: (props: setLoadingProps) => void
}