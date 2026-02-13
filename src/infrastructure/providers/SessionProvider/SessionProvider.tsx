"use client"

// REACT & NEXT
import { createContext, useCallback, useContext, useEffect, useState } from "react"
// TYPES
import { SessionContextProps, SessionProviderProps } from "@/src/infrastructure/providers/SessionProvider/prop"
import { UserSession } from "@/src/infrastructure/auth/authTypes"
// AUTH SERVICE
import { getSession } from "@/src/infrastructure/auth/authService"


// CUSTOM CONTEXT
const SessionContext = createContext<SessionContextProps | undefined>(undefined)


// PROVIDER
export function SessionProvider({ children }: SessionProviderProps) {

    const [session, setSession] = useState<UserSession | null>(null)
    const [isPending, setIsPending] = useState(true)

    const refreshSession = useCallback(async () => {

        setIsPending(true)

        try {

            const userSession = await getSession()
            setSession(userSession)

        } finally {

            setIsPending(false)
        }

    }, [])

    useEffect(() => {

        refreshSession()

    }, [refreshSession])

    return (

        <SessionContext.Provider value={{ session, isPending, refreshSession }}>
            {children}
        </SessionContext.Provider>
    )
}


// CUSTOM HOOK
export function useSession() {

    const context = useContext(SessionContext)

    if (!context) throw new Error("useSession must be used inside SessionProvider")

    return context
}
