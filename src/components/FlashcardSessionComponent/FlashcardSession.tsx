"use client"

// COMPONENTS
import FlashcardFormComponent from "@/src/components/FlashcardFormComponent/FlashcardFormComponent"
import TableComponent from "@/src/components/TableComponent/table"
import DeckHalfSvg from "@/src/components/svg/DeckHalfSvg"
import DeckFullSvg from "@/src/components/svg/DeckFullSvg"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useFlashcardSessionReducer } from "@/src/components/FlashcardSessionComponent/useFlashcardSessionReducer"
import { useFlashcardSessionCustomEffect } from "@/src/components/FlashcardSessionComponent/useFlashcardSessionCustomEffect"
// TYPES
import { FlashcardCategoryWithDeckWords } from "@/src/infrastructure/store/globalStoreType"



export default function FlashcardSessionComponent() {

    //STORE
    const language = GlobalStore((state) => state.Language)
    const sessionData = GlobalStore((state) => state.SessionData)
    const item = GlobalStore((state) => state.SelectedItem) as FlashcardCategoryWithDeckWords
    const hasHydrated = GlobalStore((state) => state.HasHydrated)

    //HOOKS
    const {state, dispatch} = useFlashcardSessionReducer()

    // USE EFFECT
    useFlashcardSessionCustomEffect({state, sessionData, hasHydrated, dispatch})


    return (

        <>
            {sessionData.type === "flashcard" && 
            
                <div className="container grid grid-cols-1 md:grid-cols-[auto_auto_1fr] max-w-screen-xl mx-auto px-4 gap-6">
                    {/* SVG */}
                    <div className="flex justify-center items-center h-[373px] sm:h-[486px] md:h-[600px] order-1">
                        {sessionData.data.FIsFullDeckSvgShow ? (
                        <DeckFullSvg
                            language={language}
                            text1={sessionData.data.FQuestion}
                            text2={sessionData.data.FAnswer}
                            category={item!.name}
                        />
                        ) : (
                        <DeckHalfSvg
                            language={language}
                            text1={sessionData.data.FQuestion}
                            category={item!.name}
                        />
                        )}
                    </div>

                    {/* Butonlar */}
                    <div className="flex justify-center md:items-center h-auto md:h-[600px] order-2 w-full">
                        <FlashcardFormComponent dispatch={dispatch} />
                    </div>

                    {/* Tablo */}
                    <div className="order-3">
                        <TableComponent
                            type="flashcard"
                            columns={["Question", "Answer", "Status"]}
                            contents={state.paginatedRows}
                            page={state.page}
                            limit={state.limit}
                            total={state.total}
                            dispatch={dispatch}
                        />
                    </div>
                </div>
            }
        </>
    )
}