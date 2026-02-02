"use client"

// REACT & NEXT
import Image from "next/image"
import { useActionState } from "react"
// BETTER AUTH
import { authClient } from "@/src/infrastructure/auth/auth-client"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useProfilePageReducer } from "@/src/page/ProfilePage/useProfileReducer"
import { useProfilePageCustomEffect } from "@/src/page/ProfilePage/useProfilePageCustomEffect"
import { handleSubmit } from "@/src/page/ProfilePage/handlers"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
//COMPONENTS
import Loader from "@/src/components/loader"


export default function Page() {

    //HOOKS
    const {states, dispatch} = useProfilePageReducer()
    const { showAlert } = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()

    //SESSION
    const {data: session, isPending: isPendingBetterAuth} = authClient.useSession() 
    const userId = session?.user.id

    //USE EFFECTS
    useProfilePageCustomEffect({userId, state: states.state, setLoading, showAlert, dispatch})

    if(isLoading && loadingSource === "page" ) return <Loader/>

    return (

        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
            
            <form method="POST" onSubmit={(e) => handleSubmit({ e, dispatch, setLoading })}>

                {/* HIDDEN DATA'S*/}
                <input type="hidden" name="userId" value={userId} />

                {/* PROFILE IMAGE */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24 mb-4">
                        <Image
                            src={typeof states.profileImage === "string"
                                    ? states.profileImage
                                    : states.profileImage
                                        ? URL.createObjectURL(states.profileImage)
                                        : "/images/default.jpg"}
                            alt="Profile Image"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>

                        {/* HIDDEN FILE INPUT*/}
                        <input
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                            onChange={(e) => {

                                const file = e.target.files?.[0]

                                if(file) dispatch({type: "SET_PROFILE_IMAGE", payload: {profileImage: file}})
                                
                            } }
                            className="hidden"
                        />

                    <label
                        htmlFor="profileImage"
                        className="cursor-pointer px-4 py-2 text-sm bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors"
                    >
                        Upload New Image
                    </label>
                </div>
                
                {/* NAME */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={states.name}
                        onChange={(e) => dispatch({type: "SET_NAME" , payload: {name: e.target.value}})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                {/* EMAIL (READ-ONLY) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={states.user?.email || ""}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                    />
                </div>
                
                {/* NATIVE LANGUAGE */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Native Language
                    </label>
                    <select
                        value={states.nativeLanguageId}
                        id="nativeLanguageId"
                        name="nativeLanguageId"
                        onChange={(e) => dispatch({type: "SET_NATIVE_LANGUAGE_ID" , payload: {nativeLanguageId: Number(e.target.value)}})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a language</option>

                        {states.languages.map((language) => (
                            
                            <option key={language.id} value={language.id}> {language.name} </option>
                            
                        ))}

                    </select>
                </div>
                

                <button
                    disabled= {(isLoading && loadingSource === "ProfileHandleSubmit") || isPendingBetterAuth}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white cursor-pointer`}
                >
                    {isLoading && loadingSource === "ProfileHandleSubmit" ? (
                        <div className="flex items-center justify-center">
                            <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"/>
                        </div>
                    ) : (
                        "Save Changes"
                    )}

                </button>

            </form>
            
        </div>
    )
}