"use client"

// REDUCER & HANDLERS & CUSTOM EFFECTS
import { useFlashcardAddReducer } from "./useFlashcardAddReducer"
import { useFlashcardAddCustomEffect } from "./useFlashcardAddCustomEffect"
import { handleSubmit } from "./handlers"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// PROVIDERS
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import Loader from "@/src/components/loader"


export default function FlashcardAddComponent () {

    //SESSION
    const {data: session, isPending: isPendingBetterAuth} = authClient.useSession() 
    const userId = session?.user.id

    // HOOKS
    const {states , dispatch} = useFlashcardAddReducer()
    const {showAlert} = useAlert()
    const {isLoading , loadingSource, setLoading} = useLoading()

    // USE EFFECT
    useFlashcardAddCustomEffect({state: states.state, dispatch, setLoading, showAlert})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Category</h2>

                <form className="space-y-6" method="POST" onSubmit={(e) => handleSubmit({ e, dispatch, setLoading })} >

                    {/* HIDDEN DATA'S*/}
                    <input type="hidden" name="userId" value={userId} />
                    <input type="hidden" name="practice" value="flashcard" />
    
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
                            <option value={0}>Select a language</option>
                            
                            {
                                states.languages!.length > 0 &&
                                states.languages!
                                        .filter(language => language.name && language.name.length > 0)
                                        .slice(0, 4)
                                        .map((language, index) => (
                                            <option key={index} value={language.id}>{language.name.charAt(0).toUpperCase() + language.name.slice(1).toLowerCase()}</option>
                                        ))
                            }
        
                        </select>
                    </div>
        
                    {/* NAME */}
                    <div>
                        <label 
                            htmlFor="categoryName" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Category Name`}
                            value={states.name}
                            name='categoryName'
                            onChange={(e) => dispatch({type: "SET_NAME", payload: {name: e.target.value}})}
                            required
                        />
                    </div>
        
                    <button
                        disabled= {(isLoading && loadingSource === "FlashcardAddHandleSubmit") || isPendingBetterAuth}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        {isLoading && loadingSource === "FlashcardAddHandleSubmit" ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                "Create"
                        )}
                    </button>
    
                </form>
            </div>
            </div>
        </div>
    )
}