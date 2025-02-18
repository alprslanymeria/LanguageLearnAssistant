import { NextResponse } from "next/server";
import { auth } from "@/src/Auth"
import { decrypt } from "@/src/lib/crypto"

const BASE = process.env.NEXT_PUBLIC_BASE_URL

const protectedRoutes = ["/create", "/session", "/lang", "/detail", "/list", "/edit", "/add"]
const publicRoutes = ["/auth", "/auth/login", "/auth/signup"]
const passRoutes = ["/api", "/_next", "/favicon.ico"]

export default async function middleware(req){

    //GET PATH
    const path = req.nextUrl.pathname;

    //PATH CHECK
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
    const isPassRoute = passRoutes.some(route => path.startsWith(route));

    if(isPassRoute) return NextResponse.next();

    //GET SESSION
    const session = await auth()

    if(path.startsWith("/session" && session))
    {
        // GET SESSION ID & USER ID
        const encryptedSessionId = req.nextUrl.searchParams.get("id");
        const sessionId = decrypt(encryptedSessionId)
        const userId = session.user.userId

        // COMPARE SESSION ID & USER ID
        const response = await fetch(`${BASE}/api/compare?sessionId=${sessionId}&userId=${userId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if(response.status != 200) return NextResponse.redirect(`${BASE}`)
        
        return NextResponse.next()

    }


    if(isProtectedRoute && !session) return NextResponse.redirect(`${BASE}/auth/login`);

    if(isPublicRoute && session) return NextResponse.redirect(`${BASE}`);

    return NextResponse.next();
}