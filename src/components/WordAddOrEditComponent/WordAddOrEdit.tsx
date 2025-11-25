"use client"

// REACT & NEXT
import { useActionState } from "react"
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/lib/auth-client"
// PRISMA
import { FlashcardCategory } from "@prisma/client"
// ACTIONS
import { DeckWordAddOrUpdate } from "@/src/actions/crud"
// TYPES
import { WordAddOrEditComponentProps } from "@/src/components/WordAddOrEditComponent/prop"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useWordAddOrEditReducer } from "@/src/components/WordAddOrEditComponent/useWordAddOrEditReducer"
import { useWordAddOrEditCustomEffect } from "@/src/components/WordAddOrEditComponent/useWordAddOrEditCustomEffect"
// PROVIDERS
import { useAlert } from "@/src/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import Loader from "@/src/components/loader"


export default function WordAddOrEditComponent ({type, itemId} : WordAddOrEditComponentProps) {

    // ACTION
    const [state, formAction, isPending] = useActionState(DeckWordAddOrUpdate, undefined)

    //SESSION
    const {data: session, isPending: isPendingBetterAuth} = authClient.useSession() 
    const userId = session?.user.id

    // HOOKS
    const {states , dispatch} = useWordAddOrEditReducer()
    const {showAlert} = useAlert()
    const {isLoading , loadingSource, setLoading} = useLoading()
    const router = useRouter()

    // USE EFFECT
    useWordAddOrEditCustomEffect({userId, router, state, itemId, setLoading, showAlert, dispatch})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{type == "Create" ? "Add Word" : "Edit Word"}</h2>

                <form action={formAction} className="space-y-6">

                    {/* HIDDEN DATA'S*/}
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="itemId" value={itemId ?? ""} />
                    <input type="hidden" name="table" value="fwords" />
                    <input type="hidden" name="type" value={type} />
    
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
                                        .filter(language => language.id <= 4)
                                        .map((language, index) => (
                                            <option key={index} value={language.id}>{language.name.charAt(0).toUpperCase() + language.name.slice(1).toLowerCase()}</option>
                                        ))
                            }
        
                        </select>
                    </div>

                    {/* DECK CATEGORY FOR WORD */}
                    <div>
                        <label 
                            htmlFor="wordCategoryId" 
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
                            {states.categories
                                .filter((category: any) => String(category.flashcard.languageId) === String(states.languageId))
                                .map( (category : FlashcardCategory) => ( <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
        
                    {/* INPUT 1 */}
                    <div>
                        <label 
                            htmlFor="inputOne" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Word
                        </label>
                        <input
                            type="text"
                            id="inputOne"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Word`}
                            value={states.inputOne}
                            name='inputOne'
                            onChange={(e) => dispatch({type: "SET_INPUT_ONE", payload: {inputOne: e.target.value}})}
                            required
                        />
                    </div>

                    {/* INPUT 2 */}
                    <div>
                        <label 
                            htmlFor="inputTwo" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Answer
                        </label>
                        <input
                            type="text"
                            id="inputTwo"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Answer`}
                            value={states.inputTwo}
                            name='inputTwo'
                            onChange={(e) => dispatch({type: "SET_INPUT_TWO", payload: {inputTwo: e.target.value}})}
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
                                type
                        )}

                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}