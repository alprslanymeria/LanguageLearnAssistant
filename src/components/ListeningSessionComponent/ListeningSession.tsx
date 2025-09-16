"use client"

// COMPONENTS
import TableComponent from "@/src/components/TableComponent/table"
import ListeningFormComponent from "@/src/components/ListeningFormComponent/ListeningFormComponent"
// STORE
import { GlobalStore } from "@/src/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useListeningSessionReducer } from "@/src/components/ListeningSessionComponent/useListeningSessionReducer"
import { useListeningSessionCustomEffect } from "@/src/components/ListeningSessionComponent/useListeningSessionCustomEffect"
// TYPES
import { ListeningCategoryWithDeckVideos } from "@/src/types/globalStore"

export default function ListeningSessionComponent() {

    //HOOKS
    const {state, dispatch} = useListeningSessionReducer()

    //STORE
    const sessionData = GlobalStore((state) => state.SessionData)
    const item = GlobalStore((state) => state.SelectedItem) as ListeningCategoryWithDeckVideos
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const updateListeningSession = GlobalStore((state) => state.updateListeningSession)


    // USE EFFECT
    useListeningSessionCustomEffect({state, sessionData, deckVideos: item.deckVideos, hasHydrated, updateListeningSession, dispatch})

    return (

        <>
            {sessionData.type === "listening" && 
            
                <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
            
                    {/* Video Player */}
                    {sessionData.data.LCurrentVideo && (
                        <div className="w-full flex flex-col gap-2">
                            <video
                                key={sessionData.data.LCurrentVideo}
                                src={sessionData.data.LCurrentVideo}
                                controls
                                autoPlay
                                className="w-full rounded-2xl shadow"
                                onEnded={() => {updateListeningSession({data: {LVideoEnded: true}})}}
                            />
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full">
                            <ListeningFormComponent dispatch={dispatch}/>
                        </div>
                    </div>

                    <div>
                        <TableComponent 
                            type="listening" 
                            columns={["Listened", "Answer" , "Similarity"]} 
                            contents={state.paginatedRows} 
                            page={state.page} 
                            limit={state.limit} 
                            total={state.total} 
                            dispatch={dispatch}/>
                    </div>
                </div>
            }
        </>
    )
}