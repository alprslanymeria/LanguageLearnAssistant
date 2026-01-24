import { NextResponse } from "next/server"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_BASE_URL

const ROUTES = {
    protected: ["/create", "/session", "/language", "/practice", "/profile", "/detail", "/list", "/edit", "/add"],
    public: ["/auth", "/auth/login", "/auth/signup"],
    pass: ["/api", "/_next", "/favicon.ico"]
}

// HELPER: CHECK IF ROUTES MATCHING GIVEN LIST
const isRouteMatching = (path, routes) => 
    routes.some(route => path.startsWith(route))

// HELPER: GET USER SESSION
const getSession = async () =>
     await auth.api.getSession({headers: await headers()})



export default async function proxy(req){

    //GET PATH
    const path = req.nextUrl.pathname

    //PATH CHECK
    const isPassRoute = isRouteMatching(path, ROUTES.pass);
    const isProtectedRoute = isRouteMatching(path, ROUTES.protected);
    const isPublicRoute = isRouteMatching(path, ROUTES.public);

    if(isPassRoute) return NextResponse.next()

    //GET SESSION
    const session = await getSession()

    if (isProtectedRoute && !session) return NextResponse.redirect(`${BASE}/auth/login`)

    if (isPublicRoute && session) return NextResponse.redirect(`${BASE}`)

    return NextResponse.next()
}