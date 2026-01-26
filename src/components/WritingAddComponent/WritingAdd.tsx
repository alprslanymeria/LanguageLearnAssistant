"use client"

// REACT & NEXT
import { useActionState } from "react"
import { useRouter } from "next/navigation"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// ICONS
import FileIcon from "@/src/components/svg/FileUpload"
// ACTIONS
import { UpdateWritingBook } from "@/src/actions/WritingBook/Controller"
// REDUCER & HANDLERS & CUSTOM EFFECTS
import { handleFileChangeOne, handleFileChangeTwo } from "@/src/components/WritingEditComponent/handlers"
import { useWritingAddReducer } from "./useWritingAddReducer"
import { useWritingAddCustomEffect } from "./useWritingAddCustomEffect"
// PROVIDERS
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// COMPONENTS
import Loader from "@/src/components/loader"



export default function WritingAddComponent() {

    // ACTION
    const [state, formAction, isPending] = useActionState(UpdateWritingBook, undefined)

    // HOOKS
    const {states , dispatch} = useWritingAddReducer()
    const {showAlert} = useAlert()
    const router = useRouter()
    const {isLoading , loadingSource, setLoading} = useLoading()

    //SESSION
    const {data: session, isPending: isPendingBetterAuth} = authClient.useSession() 
    const userId = session?.user.id

    // USE EFFECT
    useWritingAddCustomEffect({state, router, dispatch, setLoading, showAlert})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Book</h2>

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
        
                    {/* NAME */}
                    <div>
                        <label 
                            htmlFor="name" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Book Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Book Name`}
                            value={states.name}
                            name='name'
                            onChange={(e) => dispatch({type: "SET_NAME", payload: {name: e.target.value}})}
                            required
                        />
                    </div>
        
                    {/* FILE 1*/}
                    <div>
                        <label 
                            htmlFor="fileOne" 
                            className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Book Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                        <div className="space-y-1 flex flex-col items-center">
                            <FileIcon/>
                            <div className="flex text-sm text-gray-600">
                                <label
                                htmlFor="fileOne"
                                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                <span>Choose File</span>
                                <input
                                    id="fileOne"
                                    name="fileOne"
                                    type="file"
                                    className="sr-only"
                                    accept=".png,.jpg,.jpeg"
                                    onChange={(e) => handleFileChangeOne({e, dispatch})}
                                    required
                                />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, JPEG (max 50MB)
                            </p>
                            {states.fileError && (
                                <p className="text-xs text-red-500 mt-1">{states.fileError}</p>
                            )}
                            {states.fileOne && (
                                <p className="text-xs text-green-500 mt-1">
                                    Selected file: {states.fileOne.name}
                                </p>
                            )}
                        </div>
                        </div>
                    </div>
        
                    {/* FILE 2*/}
                    <div>
                        <label 
                        htmlFor="fileTwo" 
                        className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Book Pdf
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                        <div className="space-y-1 flex flex-col items-center">
                            <FileIcon></FileIcon>
                            <div className="flex text-sm text-gray-600">
                                <label
                                htmlFor="fileTwo"
                                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                <span>Choose File</span>
                                <input
                                    id="fileTwo"
                                    name="fileTwo"
                                    type="file"
                                    className="sr-only"
                                    accept=".pdf,.mp4,.mov,.avi,.webm"
                                    onChange={(e) => handleFileChangeTwo({e, dispatch})}
                                    required
                                />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PDF, MP4, MOV, AVI, WebM (max 50MB)
                            </p>
                            {states.fileError && (
                                <p className="text-xs text-red-500 mt-1">{states.fileError}</p>
                            )}
                            {states.fileTwo && (
                                <p className="text-xs text-green-500 mt-1">
                                    Selected file: {states.fileTwo.name}
                                </p>
                            )}
                        </div>
                        </div>
                    </div>
        
                    <button
                        disabled={isPending || isPendingBetterAuth}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        
                        {isPending ? (
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