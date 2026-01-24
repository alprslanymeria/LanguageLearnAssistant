"use client"

// COMPONENTS
import ReadingFormComponent from "@/src/components/ReadingFormComponent/ReadingFormComponent"
import TableComponent from "@/src/components/TableComponent/table"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useReadingSessionReducer } from "@/src/components/ReadingSessionComponent/useReadingSessionReducer"
import { useReadingSessionCustomEffect } from "@/src/components/ReadingSessionComponent/useReadingSessionCustomEffect"
// TYPES
import { ReadingBook } from "@prisma/client"


export default function ReadingSessionComponent() {

    //HOOKS
    const {state, dispatch} = useReadingSessionReducer()

    //STORE
    const sessionData = GlobalStore((state) => state.SessionData)
    const item = GlobalStore((state) => state.SelectedItem) as ReadingBook
    const hasHydrated = GlobalStore((state) => state.HasHydrated)

    // USE EFFECTS
    useReadingSessionCustomEffect({ state, sessionData, hasHydrated, dispatch})

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-gray-50">
                    <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2 bg-white overflow-hidden">
                        <div className="h-[600px] overflow-y-auto">
                            {item?.sourceUrl && (
                                <iframe
                                    src={item.sourceUrl}
                                    className="w-full h-[600px]"
                                    title="PDF Viewer"
                                />
                            )}
                        </div>
                    </div>
                    <ReadingFormComponent dispatch={dispatch}/>
                </div>
                <div>
                    <TableComponent 
                        type="readingBook" 
                        columns={["Selected", "Answer" ,"Translate", "Similarity"]} 
                        contents={state.paginatedRows} 
                        page={state.page} 
                        limit={state.limit} 
                        total={state.total} 
                        dispatch={dispatch} />
                </div>
            </div>
        </>
    )
}