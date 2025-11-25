import { NextResponse } from "next/server"
import { decrypt } from "@/src/lib/crypto"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_BASE_URL

const protectedRoutes = ["/create", "/session", "/language", "/practice", "/profile", "/detail", "/list", "/edit", "/add"]
const publicRoutes = ["/auth", "/auth/login", "/auth/signup"]
const passRoutes = ["/api", "/_next", "/favicon.ico"]

export default async function proxy(req){

    //GET PATH
    const path = req.nextUrl.pathname

    //PATH CHECK
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route))
    const isPassRoute = passRoutes.some(route => path.startsWith(route))

    if(isPassRoute) return NextResponse.next()

    //GET SESSION
    const session = await auth.api.getSession({
    
        headers: await headers()
    })

    if (isProtectedRoute && !session) return NextResponse.redirect(`${BASE}/auth/login`)

    if (isPublicRoute && session) return NextResponse.redirect(`${BASE}`)

    return NextResponse.next()
}