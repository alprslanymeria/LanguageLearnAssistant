"use client"

// REACT & NEXT
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
// COMPONENTS
import ListTableComponent from "@/src/components/ListTableComponent/listTable"
import Loader from "@/src/components/loader"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useListPageReducer } from "@/src/page/ListPage/useListPageReducer"
import { useListPageCustomEffect } from "@/src/page/ListPage/useListPageCustomEffect"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { useSession } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function ListPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const table = searchParams!.get("table")

    //SESSION
    const { session, isPending} = useSession() 
    const userId = session?.userId

    //HOOKS
    const {state, dispatch} = useListPageReducer()
    const {showAlert} = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //USE EFFECTS
    useListPageCustomEffect({userId, table, state, setLoading, showAlert, dispatch})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <ListTableComponent  width={500} columnNames={state.columnNames} items={state.items} contents={state.contents} table={state.table} state={state} dispatch={dispatch}/>
    )
}

export default function Page(){

    return (

        <Suspense>
            <ListPage/>
        </Suspense>
    )
}