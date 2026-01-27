// REACT & NEXT
import { useEffect } from "react"
import Image from "next/image"
// TYPES
import { Item, UseListPageCustomEffectProps } from "@/src/page/ListPage/prop"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { ReadingBookDto, ReadingBookWithTotalCount } from "@/src/actions/ReadingBook/Response"
import { PagedResult } from "@/src/infrastructure/common/pagedResult"
import { WritingBookDto, WritingBookWithTotalCount } from "@/src/actions/WritingBook/Response"
import { FlashcardCategoryDto, FlashcardCategoryWithTotalCount } from "@/src/actions/FlashcardCategory/Response"
import { DeckWordDto, DeckWordWithTotalCount } from "@/src/actions/DeckWord/Response"
// ACTIONS
import { GetAllRBooksWithPaging } from "@/src/actions/ReadingBook/Controller"
import { GetAllWBooksWithPaging } from "@/src/actions/WritingBook/Controller"
import { GetAllFCategoriesWithPaging } from "@/src/actions/FlashcardCategory/Controller"
import { GetAllDWordsWithPaging } from "@/src/actions/DeckWord/Controller"


export function useListPageCustomEffect( params : UseListPageCustomEffectProps) {

    const {userId, table, state, setLoading, showAlert, dispatch} = params

    // USE EFFECT ONE
    useEffect(() => {
    
        const kese = [userId, table, state]

        if(kese.some(k => !k)) return

        const GET = async () => {


            try {

                setLoading({value: true , source: "page"})

                let response;

                switch(table) {
                    case "rbooks":

                        response = await GetAllRBooksWithPaging(userId!, {page: state.page, pageSize: state.limit})

                        if(response?.status != HttpStatusCode.OK)
                        {
                            showAlert({type: "error", title: "error", message: response?.errorMessage![0]})
                            return
                        }

                        const readingData: PagedResult<ReadingBookWithTotalCount> = response!.data as PagedResult<ReadingBookWithTotalCount>
                        const readingBookItems = readingData.items[0].readingBookDtos
                        const readingTotalCount = readingData.items[0].totalCount

                        dispatch({type: "SET_ITEMS", payload: {items: readingBookItems}})
                        dispatch({type: "SET_TOTAL", payload: {total: readingTotalCount}})
                        dispatch({type: "SET_TABLE", payload: {table: "rbooks"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name", "Image"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span>{(item as ReadingBookDto).name}</span>,
                                                                                (item: Item) => <Image src={(item as ReadingBookDto).imageUrl} alt="" width={100} height={100}></Image>
                                                                            ]}})

                        return

                    case "wbooks":

                        response = await GetAllWBooksWithPaging(userId!, {page: state.page, pageSize: state.limit})

                        if(response?.status != HttpStatusCode.OK)
                        {
                            showAlert({type: "error", title: "error", message: response?.errorMessage![0]})
                            return
                        }

                        const writingData: PagedResult<WritingBookWithTotalCount> = response!.data as PagedResult<WritingBookWithTotalCount>
                        const writingBookItems = writingData.items[0].writingBookDtos
                        const writingTotalCount = writingData.items[0].totalCount

                        dispatch({type: "SET_ITEMS", payload: {items: writingBookItems}})
                        dispatch({type: "SET_TOTAL", payload: {total: writingTotalCount}})
                        dispatch({type: "SET_TABLE", payload: {table: "wbooks"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name", "Image"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span>{(item as WritingBookDto).name}</span>,
                                                                                (item: Item) => <Image alt="" width={100} height={100} src={(item as WritingBookDto).imageUrl}/>
                                                                            ]}})

                        return

                    case "fcategories":

                        response = await GetAllFCategoriesWithPaging(userId!, {page: state.page, pageSize: state.limit})

                        if(response?.status != HttpStatusCode.OK)
                        {
                            showAlert({type: "error", title: "error", message: response?.errorMessage![0]})
                            return
                        }

                        const categoryData: PagedResult<FlashcardCategoryWithTotalCount> = response!.data as PagedResult<FlashcardCategoryWithTotalCount>
                        const categoryItems = categoryData.items[0].flashcardCategoryDtos
                        const categoryTotalCount = categoryData.items[0].totalCount

                        dispatch({type: "SET_ITEMS", payload: {items: categoryItems}})
                        dispatch({type: "SET_TOTAL", payload: {total: categoryTotalCount}})
                        dispatch({type: "SET_TABLE", payload: {table: "fcategories"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Name"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span className="text-gray-800">{(item as FlashcardCategoryDto).name}</span>
                                                                            ]}})

                        return

                    case "fwords":

                        response = await GetAllDWordsWithPaging(userId!, {page: state.page, pageSize: state.limit})

                        if(response?.status != HttpStatusCode.OK)
                        {
                            showAlert({type: "error", title: "error", message: response?.errorMessage![0]})
                            return
                        }

                        const deckWordData: PagedResult<DeckWordWithTotalCount> = response!.data as PagedResult<DeckWordWithTotalCount>
                        const deckWordItems = deckWordData.items[0].deckWordDtos
                        const deckWordTotalCount = deckWordData.items[0].totalCount

                        dispatch({type: "SET_ITEMS", payload: {items: deckWordItems}})
                        dispatch({type: "SET_TOTAL", payload: {total: deckWordTotalCount}})
                        dispatch({type: "SET_TABLE", payload: {table: "fwords"}})
                        dispatch({type: "SET_COLUMN_NAMES", payload: {columnNames: ["Question", "Answer"]}})
                        dispatch({type: "SET_CONTENTS", payload: {contents: [
                                                                                (item: Item) => <span className="text-gray-800">{(item as DeckWordDto).question}</span>,
                                                                                (item: Item) => <span className="text-gray-800">{(item as DeckWordDto).answer}</span>
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