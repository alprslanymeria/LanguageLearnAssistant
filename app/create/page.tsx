"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// STORE
import { GlobalStore } from "@/src/infrastructure/store/globalStore"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useCreatePageCustomEffect } from "@/src/page/CreatePage/useCreatePageCustomEffect"
import { handleChoose, handleSvgClick } from "@/src/page/CreatePage/handlers"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import Loader from "@/src/components/loader"
import HeadphonesSvg from "@/src/components/svg/HeadphonesSvg"
// TYPES
import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { FlashcardCategoryWithDeckWords } from "@/src/actions/FlashcardCategory/Response"
import { ListeningCategoryWithDeckVideos } from "@/src/actions/ListeningCategory/Response"



export default function Page(){

    // HOOKS
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //SESSION
    const {data: session, isPending} = authClient.useSession() 
    const userId = session?.user.id

    //STORE
    const language = GlobalStore((state) =>  state.Language)
    const practice = GlobalStore((state) =>  state.Practice)
    const oldSessions = GlobalStore((state) =>  state.OldSessions)
    const createItems = GlobalStore((state) =>  state.CreateItems)
    const selectedItemId = GlobalStore((state) =>  state.SelectedItemId)
    const hasHydrated = GlobalStore((state) => state.HasHydrated)
    const setCreateItems = GlobalStore((state) =>  state.setCreateItems)
    const setSelectedItemId = GlobalStore((state) =>  state.setSelectedItemId)
    const setOldSessionId = GlobalStore((state) =>  state.setOldSessionId)
    const resetExcept = GlobalStore((state) => state.resetExcept)

    //USE EFFECTS
    useCreatePageCustomEffect({

        userId,
        language,
        practice,
        router,
        hasHydrated,
        oldSessions,
        createItems,
        setCreateItems,
        setLoading,
        showAlert,
        resetExcept
    })
    
    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <>
            <div className="flex justify-center w-full">
                <div className="carousel rounded-box flex ml-0 md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-6 h-[550px] overflow-y-auto items-center px-10">
                {createItems && createItems!.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                            selectedItemId === item.id
                            ? 'scale-110'
                            : 'hover:scale-102'
                        }`}
                        onClick={() => handleSvgClick({item, setSelectedItemId})}
                        >
                            {practice === 'reading' && (
                                <BookSvg reading={{item: (item as ReadingBookDto) , contents: []}}/>
                            )}
                            {practice === 'writing' && (
                                <BookSvg writing={{item: (item as WritingBookDto) , contents: []}}/>
                            )}
                            {practice === 'flashcard' && (
                                <DeckSvg flashcard={{item: (item as FlashcardCategoryWithDeckWords) , contents: []}} language={language}/>
                            )}
                            {practice === 'listening' && (
                                <HeadphonesSvg listening={{item: (item as ListeningCategoryWithDeckVideos), contents: []}}/>
                            )} 
                    </div>
                ))}
                </div>
            </div>

            <div className="w-full flex justify-center my-2">
                <button
                    disabled= {(isLoading && loadingSource === "ChooseHandler") || isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleChoose({userId, selectedItemId, router, showAlert, setOldSessionId, setLoading })}
                >
                    {isLoading && loadingSource === "ChooseHandler" ? (
                        <div className="flex items-center justify-center">
                            <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                        </div>
                    ) : (
                        "CHOOSE"
                    )}
                </button>
            </div>
        </>
    )
}