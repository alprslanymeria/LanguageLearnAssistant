// IMPORTS
import { NextResponse } from "next/server"

const BASE = process.env.NEXT_PUBLIC_BASE_URL

const ROUTES = {
    protected: ["/create", "/session", "/language", "/practice", "/profile", "/detail", "/list", "/edit", "/add"],
    public: ["/auth", "/auth/login", "/auth/signup"],
    pass: ["/api", "/_next", "/favicon.ico"]
}

// HELPER: CHECK IF ROUTES MATCHING GIVEN LIST
const isRouteMatching = (path, routes) => 
    routes.some(route => path.startsWith(route))


// HELPER: CHECK IF ACCESS TOKEN EXISTS AND IS NOT EXPIRED
const getSession = (req) => {

    const token = req.cookies.get("access_token")?.value
    if (!token) return null

    try {

        const parts = token.split(".")
        if (parts.length !== 3) return null

        const payload = JSON.parse(atob(parts[1]))
        const exp = payload.exp * 1000

        if (Date.now() >= exp) return null

        return payload

    } catch {

        return null
    }
}


export default async function proxy(req){

    //GET PATH
    const path = req.nextUrl.pathname

    //PATH CHECK
    const isPassRoute = isRouteMatching(path, ROUTES.pass);
    const isProtectedRoute = isRouteMatching(path, ROUTES.protected);
    const isPublicRoute = isRouteMatching(path, ROUTES.public);

    if(isPassRoute) return NextResponse.next()

    //GET SESSION
    const session = getSession(req)

    if (isProtectedRoute && !session) return NextResponse.redirect(`${BASE}/auth/login`)

    if (isPublicRoute && session) return NextResponse.redirect(`${BASE}`)

    return NextResponse.next()
}