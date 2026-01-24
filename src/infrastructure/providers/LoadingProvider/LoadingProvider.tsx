"use client"

// REACT & NEXT
import { createContext, useContext, useEffect, useState } from "react"
// TYPES
import { LoadingContextProps, LoadingProviderProps, LoadingSource, setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"


// CUSTOM CONTEXT
const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

// PROVIDER
export function LoadingProvider({children} : LoadingProviderProps) {

    const [isLoading, setIsLoading] = useState(true)
    const [loadingSource, setLoadingSource] = useState<LoadingSource | null>("page")

    const setLoading = ({value, source} : setLoadingProps) => {

        setIsLoading(value)
        setLoadingSource(value ? source ?? null : null)
    }
        
    return (
        
        <LoadingContext.Provider value={{ isLoading, loadingSource, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

// CUSTOM HOOK
export function useLoading() {

    const context = useContext(LoadingContext)

    if (!context) throw new Error("useLoading must be used inside LoadingProvider")

    return context
}