"use client"

// REACT & NEXT
import { useActionState } from "react"
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// PRISMA
import { FlashcardCategory } from "@prisma/client"
// ACTIONS
import { CreateDeckWord } from "@/src/actions/DeckWord/Controller"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useWordAddReducer } from "./useWordAddReducer"
import { useWordAddCustomEffect } from "./useWordAddCustomEffect"
// PROVIDERS
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import Loader from "@/src/components/loader"



export default function WordAddComponent () {

    // ACTION
    const [state, formAction, isPending] = useActionState(CreateDeckWord, undefined)

    //SESSION
    const {data: session, isPending: isPendingBetterAuth} = authClient.useSession() 
    const userId = session?.user.id

    // HOOKS
    const {states , dispatch} = useWordAddReducer()
    const {showAlert} = useAlert()
    const {isLoading , loadingSource, setLoading} = useLoading()
    const router = useRouter()

    // USE EFFECT
    useWordAddCustomEffect({userId, router, state, setLoading, showAlert, dispatch})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Add Word</h2>

                <form action={formAction} className="space-y-6">

                    {/* HIDDEN DATA'S*/}
                    <input type="hidden" name="userId" value={userId} />
    
                    {/* LANGUAGE OPTIONS*/}
                    <div>
                        <label 
                            htmlFor="languageId" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Language
                        </label>
                        <select
                            id="languageId"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            value={states.languageId}
                            name='languageId'
                            onChange={(e) =>  dispatch({type: "SET_LANGUAGE_ID", payload: {languageId: Number(e.target.value)}})}
                            required
                        >
                            {
                                states.languages!.length > 0 &&
                                states.languages!
                                        .filter(language => language.name && language.name.length > 0)
                                        .slice(0, 4)
                                        .map((language, index) => (
                                            <option key={index} value={index}>{language.name.charAt(0).toUpperCase() + language.name.slice(1).toLowerCase()}</option>
                                        ))
                            }
        
                        </select>
                    </div>

                    {/* DECK CATEGORY FOR WORD */}
                    <div>
                        <label 
                            htmlFor="categoryId" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Deck
                        </label>
                        <select
                            id="categoryId"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            value={states.categoryId}
                            name='categoryId'
                            onChange={(e) => dispatch({type: "SET_CATEGORY_ID", payload: {categoryId: Number(e.target.value)}})}
                            required
                        >
                            {states.categories.flashcardCategoryDtos
                                .filter((category: any) => String(category.flashcard.languageId) === String(states.languageId))
                                .map( (category : FlashcardCategory) => ( <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
        
                    {/* WORD */}
                    <div>
                        <label 
                            htmlFor="word" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Word
                        </label>
                        <input
                            type="text"
                            id="word"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Word`}
                            value={states.word}
                            name='word'
                            onChange={(e) => dispatch({type: "SET_WORD", payload: {word: e.target.value}})}
                            required
                        />
                    </div>

                    {/* ANSWER */}
                    <div>
                        <label 
                            htmlFor="answer" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Answer
                        </label>
                        <input
                            type="text"
                            id="answer"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Answer`}
                            value={states.answer}
                            name='answer'
                            onChange={(e) => dispatch({type: "SET_ANSWER", payload: {answer: e.target.value}})}
                            required
                        />
                    </div>
        
                    <button
                        disabled= {isPending || isPendingBetterAuth}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >

                        {isPending ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                                </div>
                            ) : (
                                "Add"
                        )}

                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}