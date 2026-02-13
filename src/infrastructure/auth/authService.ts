// TYPES
import { UserDto } from "@/src/actions/User/Response"
import { ApiServiceResult, SignInRequest, SignUpRequest, UserSession } from "@/src/infrastructure/auth/authTypes"


// SIGNS IN A USER VIA THE NEXT.JS BFF ROUTE HANDLER
// TOKENS ARE STORED IN HTTPONLY COOKIES BY THE SERVER
export async function signIn(params: SignInRequest): Promise<ApiServiceResult<void>> {

    const response = await fetch("/api/auth/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    })

    const result = await response.json()

    if (!response.ok) {

        return { errorMessage: result.errorMessage ?? ["SignIn failed!"] }
    }

    return {}
}


// SIGNS UP A NEW USER VIA THE NEXT.JS BFF ROUTE HANDLER
export async function signUp(params: SignUpRequest): Promise<ApiServiceResult<UserDto>> {

    const response = await fetch("/api/auth/signup", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    })

    const result = await response.json()

    if (!response.ok) {

        return { errorMessage: result.errorMessage ?? ["SignUp failed!"] }
    }

    return { data: result.data }
}


// SIGNS OUT THE CURRENT USER VIA THE NEXT.JS BFF ROUTE HANDLER
// CLEARS HTTPONLY COOKIES VIA THE SERVER ROUTE HANDLER
export async function signOut(): Promise<void> {

    await fetch("/api/auth/logout", {
        method: "POST",
    })
}


// RETRIEVES THE CURRENT USER SESSION FROM THE SERVER
export async function getSession(): Promise<UserSession | null> {

    try {

        const response = await fetch("/api/auth/session")

        if (!response.ok) return null

        const result = await response.json()
        return result.session ?? null

    } catch {

        return null
    }
}


// REDIRECTS TO GOOGLE OAUTH LOGIN VIA THE NEXT.JS BFF ROUTE
export function signInWithGoogle(): void {

    window.location.href = "/api/auth/google"
}