"use client"

// REACT & NEXT
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
// ASSETS
import { markazi } from "@/public/fonts"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import InfoMessageComponent from "@/src/components/InfoMessageComponent/infoMessage"
import Loader from "@/src/components/loader"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { usePracticePageCustomEffect } from "@/src/page/PracticePage/usePracticePageCustomEffect"
import { handleCreateClick } from "@/src/page/PracticePage/handlers"
import { usePracticePageReducer } from "@/src/page/PracticePage/usePracticePageReducer"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// COMPONENTS
import PaginationComponent from "@/src/components/PaginationComponent/PaginationComponent"
import { Suspense } from "react"


// BUILD SIRASINDA HATA VERDİĞİ İÇİN SUSPENSE BOUNDARY İÇERİSİNE ALINDI.
function PracticePage() {

    // GET SLUG
    const params = useParams<{ practice: string }>()
    const practice = params?.practice

    // GET SEARCH QUERY PARAMS
    const searchParams = useSearchParams()
    const language = searchParams!.get("language")

    //SESSION
    const {data: session} = authClient.useSession() 
    const userId = session?.user.id

    // HOOKS
    const {state, dispatch} = usePracticePageReducer()
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading, loadingSource, setLoading} = useLoading()

    // STORE
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const OldSessions = GlobalStore((state) => state.OldSessions)
    const setPractice = GlobalStore((state) => state.setPractice)
    const resetExcept = GlobalStore((state) => state.resetExcept)
    const setOldSessions = GlobalStore((state) => state.setOldSessions)
    

    // USE EFFECTS
    usePracticePageCustomEffect({
        userId,
        language,
        practice: practice!.at(0),
        hasHydrated,
        state,
        router,
        setPractice,
        setOldSessions,
        setLoading,
        showAlert,
        resetExcept,
        dispatch
    })

    if(isLoading && loadingSource === "page" ) return <Loader/>
    
    return (
        <>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."/>

            <>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p className={`${markazi.className} mb-10 text-xl font-normal text-center`}>{!OldSessions ? "You Dont Have Any! Create One" : OldSessions!.length === 0 ? "You Dont Have Any! Create One" : "You Have Session! Create Another One"}</p>
                        <button
                            onClick={() => handleCreateClick({router})}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#007BFF',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Create New Session
                        </button>
                </div>

                {OldSessions && OldSessions!.length != 0 ?

                    <div className="container max-w-lg rounded-lg mx-auto bg-[#4D5B6C] p-5 mt-5">
                        <div>
                            {OldSessions!.map((session, index) => (
                                <Link key={index} href={`/detail?id=${session.oldSessionId}`} passHref>
                                    <div 
                                        className="flex justify-between bg-white p-4 mb-3 rounded shadow-sm"
                                        >
                                        <p className="text-black-800">{new Date(session.createdAt).toLocaleString()}</p>
                                        <p className="text-black-600 m-0">Rate: {Number(session.rate).toFixed(2)}/100</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    : null
                }

                {OldSessions && OldSessions.length != 0 ? 
                
                    <PaginationComponent
                        page={state.page}
                        limit={state.limit}
                        total={state.total}
                        onPageChange={(newPage) => dispatch({ type: "SET_PAGE", payload: { page: newPage } })}
                        onLimitChange={(newLimit) => dispatch({ type: "SET_LIMIT", payload: { limit: newLimit } })}
                    />
                    : null
            
                }
                
            </>
        </>
    )
}

export default function Page() {

    return (

        <Suspense>
            <PracticePage/>
        </Suspense>
    )
}