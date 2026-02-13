"use client"

// REACT & NEXT
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
//COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import HeadphonesSvg from "@/src/components/svg/HeadphonesSvg"
import TableComponent from "@/src/components/TableComponent/table"
import Loader from "@/src/components/loader"
import { ReadingSessionRowDto } from "@/src/actions/ReadingSessionRow/Response"
import { ListeningSessionRowDto } from "@/src/actions/ListeningSessionRow/Response"
import { FlashcardSessionRowDto } from "@/src/actions/FlashcardSessionRow/Response"
import { WritingSessionRowDto } from "@/src/actions/WritingSessionRow/Response"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useDetailPageReducer } from "@/src/page/DetailPage/useDetailPageReducer"
import { useDetailPageCustomEffect } from "@/src/page/DetailPage/useDetailPageCustomEffect"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
import { useSession } from "@/src/infrastructure/providers/SessionProvider/SessionProvider"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function DetailPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const oldSessionId = searchParams!.get("id")

    //SESSION
    const { session, isPending} = useSession() 
    const userId = session?.userId

    // HOOKS
    const {state, dispatch} = useDetailPageReducer()
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading, loadingSource, setLoading} = useLoading()

    // STORE
    const language = GlobalStore((state) => state.Language )
    const practice = GlobalStore((state) => state.Practice )
    const oldSessions = GlobalStore((state) => state.OldSessions )
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const resetExcept = GlobalStore((state) => state.resetExcept )

    // USE EFFECTS
    useDetailPageCustomEffect({
        userId,
        language,
        practice,
        oldSessions,
        oldSessionId,
        hasHydrated,
        router,
        state,
        setLoading,
        showAlert,
        resetExcept,
        dispatch
    })

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return(

        <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row px-4 gap-10">
            <div className="relative h-[487px] flex w-[300px] items-center justify-center self-center">

                {practice == 'reading'
                    ? <BookSvg reading={state.reading}/>
                    : practice == 'writing'
                    ? <BookSvg writing={state.writing}/>
                    : practice == 'listening'
                    ? <HeadphonesSvg listening={state.listening}/>
                    : practice == 'flashcard'
                    ? <DeckSvg flashcard={state.flashcard} language={language}/>
                    : <p></p>
                }
                 
            </div>
            
            <div className="flex-[2]">

                {practice === "reading"
                    ? (<TableComponent contents={state.reading!.contents! as unknown as ReadingSessionRowDto[]} type="readingBook" columns={["Sentence", "Answer", "Translate", "Similarity"]} page={state.page} limit={state.limit} total={state.total} dispatch={dispatch}/>)
                    : practice == "writing" 
                    ? <TableComponent contents={state.writing!.contents! as unknown as WritingSessionRowDto[]} type="writingBook" columns={["Sentence", "Answer", "Translate", "Similarity"]} page={state.page} limit={state.limit} total={state.total} dispatch={dispatch}/>
                    : practice == "flashcard" 
                    ?  <TableComponent contents={state.flashcard!.contents! as unknown as FlashcardSessionRowDto[]} type="flashcard" columns={["Question", "Answer", "Status"]} page={state.page} limit={state.limit} total={state.total} dispatch={dispatch}/>
                    :practice == "listening"
                    ?  <TableComponent contents={state.listening!.contents! as unknown as ListeningSessionRowDto[]} type="listening" columns={["Listened Sentence", "Answer", "Similarity"]} page={state.page} limit={state.limit} total={state.total} dispatch={dispatch}/>
                    : <p></p>
                }

            </div>
        </div>
    )
}

export default function Page() {

    return (

        <Suspense>
            <DetailPage/>
        </Suspense>
    )
}