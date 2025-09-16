// REACT & NEXT
import { useEffect } from "react"
import Image from "next/image"
// TYPES
import { Item, UseListPageCustomEffectProps } from "@/src/page/ListPage/prop"
import { DeckWord, FlashcardCategory, ReadingBook, WritingBook } from "@prisma/client"
// ACTIONS
import { GetAllFCategoriesWithPaging, GetAllFWords, GetAllRBooks, GetAllWBooks } from "@/src/actions/list"


export function useListPageCustomEffect( params : UseListPageCustomEffectProps) {

    const {userId, table, state, setLoading, showAlert, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {
    
        const kese = [userId, table, state]

        if(kese.some(k => !k)) return

        const GET = async () => {


            try {

                setLoading({value: true , source: "page"})

                let response = null

                switch(table) {
                    case "rbooks":

                        response = await GetAllRBooks({userId, page: state.page, limit: state.limit})

                        if(response?.status != 200)
                        {
                            showAlert({type: "error", title: "error", message: response?.message})
                            return
                        }

                        dispatch({type: "SET_ITEMS", payload: {items: response.data?.data!}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data?.total!}})
                        dispatch({type: "SET_TABLE", payload: {table: "rbooks"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name", "Image"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span>{(item as ReadingBook).name}</span>,
                                                                                (item: Item) => <Image src={(item as ReadingBook).imageUrl} alt="" width={100} height={100}></Image>
                                                                            ]}})

                        return

                    case "wbooks":

                        response = await GetAllWBooks({userId, page: state.page, limit: state.limit})

                        if(response?.status != 200)
                        {
                            showAlert({type: "error", title: "error", message: response?.message})
                            return
                        }

                        dispatch({type: "SET_ITEMS", payload: {items: response.data?.data!}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data?.total!}})
                        dispatch({type: "SET_TABLE", payload: {table: "wbooks"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name", "Image"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span>{(item as WritingBook).name}</span>,
                                                                                (item: Item) => <Image alt="" width={100} height={100} src={(item as WritingBook).imageUrl}/>
                                                                            ]}})

                        return

                    case "fcategories":

                        response = await GetAllFCategoriesWithPaging({userId, page: state.page, limit: state.limit})

                        if(response?.status != 200)
                        {
                            showAlert({type: "error", title: "error", message: response?.message})
                            return
                        }

                        dispatch({type: "SET_ITEMS", payload: {items: response.data?.data!}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data?.total!}})
                        dispatch({type: "SET_TABLE", payload: {table: "fcategories"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span className="text-gray-800">{(item as FlashcardCategory).name}</span>
                                                                            ]}})

                        return

                    case "fwords":

                        response = await GetAllFWords({userId, page: state.page, limit: state.limit})

                        if(response?.status != 200)
                        {
                            showAlert({type: "error", title: "error", message: response?.message})
                            return
                        }

                        dispatch({type: "SET_ITEMS", payload: {items: response.data?.data!}})
                        dispatch({type: "SET_TOTAL", payload: {total: response.data?.total!}})
                        dispatch({type: "SET_TABLE", payload: {table: "fwords"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Question", "Answer"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span className="text-gray-800">{(item as DeckWord).question}</span>,
                                                                                (item: Item) => <span className="text-gray-800">{(item as DeckWord).answer}</span>
                                                                            ]}})

                        return
                    default:

                        showAlert({type: "error", title: "error", message: "Invalid Slug!"})
                        return
                }

                
            } catch (error) {

                showAlert({type: "error", title: "error", message: "Unexpected error during useListPageCustomEffect!"})
                
            } finally {

                setLoading({value: false})
            }
        }

        GET()

    }, [userId, table, state.page, state.limit])

}