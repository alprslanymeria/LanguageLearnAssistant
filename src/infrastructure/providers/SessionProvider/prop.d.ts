// TYPES
import { UserSession } from "@/src/infrastructure/auth/authTypes"
import { ReactNode } from "react"


export type SessionContextProps = {

    session: UserSession | null
    isPending: boolean
    refreshSession: () => Promise<void>
}

export type SessionProviderProps = {

    children: ReactNode
}
