// TYPES
import { Item, State, Action } from "@/src/page/ListPage/prop"
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { JSX } from "react"

// COMPONENT PROPS
export type ListTableComponentProps = {

    items: Item[]
    width: number
    columnNames: string[]
    contents: Array<(item: Item) => JSX.Element>
    table: string
    state: State
    dispatch: (action: Action) => void
}


// HANDLERS
export type HandleCreateProps = {

    router: AppRouterInstance
    table: string
}

export type HandleEditProps = {

    itemId: number
    router: AppRouterInstance
    table: string
}

export type HandleDeleteProps = {

    itemId: number
    table: string
    dispatch: (action: Action) => void
    showAlert: (props: ShowAlertProps) => void
    setLoading: (props: setLoadingProps) => void
}