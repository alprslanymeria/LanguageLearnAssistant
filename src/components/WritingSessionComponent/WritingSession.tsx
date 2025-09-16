"use client"

// COMPONENTS
import WritingFormComponent from "@/src/components/WritingFormComponent/WritingFormComponent"
import TableComponent from "@/src/components/TableComponent/table"
// STORE
import { GlobalStore } from "@/src/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useWritingSessionReducer } from "@/src/components/WritingSessionComponent/useWritingSessionReducer"
import { useWritingSessionCustomEffect } from "@/src/components/WritingSessionComponent/useWritingSessionCustomEffect"
import { WritingBook } from "@prisma/client"


export default function WritingSessionComponent() {

    //STORE
    const sessionData = GlobalStore((state) => state.SessionData)
    const item = GlobalStore((state) => state.SelectedItem) as WritingBook
    const hasHydrated = GlobalStore((state) => state.HasHydrated)

    //HOOKS
    const {state, dispatch} = useWritingSessionReducer()

    //USE EFFECTS
    useWritingSessionCustomEffect({state, sessionData, hasHydrated, dispatch})
    
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
                    <WritingFormComponent dispatch={dispatch}/>
                </div>
                <div>
                    <TableComponent 
                        type="writingBook" 
                        columns={["Selected", "Answer" ,"Translate", "Similarity"]} 
                        contents={state.paginatedRows} 
                        page={state.page} 
                        limit={state.limit} 
                        total={state.total} 
                        dispatch={dispatch}/>
                </div>
            </div>
        </>
    )
}