import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const BASE = process.env.NEXT_PUBLIC_API_URL

const protectedRoutes = ["/create", "/session", "/english", "/turkish", "/german", "/russian"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(req){

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if(isProtectedRoute && !session)
    {
        return NextResponse.redirect("/login");
    }

    if(isPublicRoute && session)
    {
        return NextResponse.redirect("/");
    }

    // Email ve UserId bilgisi şifrelenerek zustand deposuna kaydedilir


    return NextResponse.next();
    // const {pathname} = req.nextUrl

    // // FIRST
    // if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    //     return NextResponse.next()
    // }

    // // TOKEN CONTROL
    // const {value: accessToken} = req.cookies.get('accessToken') ?? {value: null}
    // const {value: refreshToken} = req.cookies.get('refreshToken') ?? {value: null}
    // const payload = await VerifyJwt(accessToken)

    // // IF TOKEN EXPIRED
    // if(payload && payload.error === 'expired')
    // {
    //     const res = await fetch(`${BASE}/api/token`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': accessToken,
    //             'X-Refresh-Token': refreshToken,
    //         },
    //         credentials: 'include',
    //     })

    //     const data = await res.json()
    //     const newAccessToken = data.accessToken
    //     const newRefreshToken = data.refreshToken

    //     const response = NextResponse.next()

    //     response.cookies.set('accessToken', newAccessToken, {
    //         httpOnly: true,
    //         secure: false,
    //         sameSite: 'lax',
    //         path: '/',
    //         maxAge: 31536000,
    //     })
    //     response.cookies.set('refreshToken', newRefreshToken, {
    //         httpOnly: true,
    //         secure: false,
    //         sameSite: 'lax',
    //         path: '/',
    //         maxAge: 31536000,
    //     })

    //     return response
    // }


    // // AUTHORIZATION CONTROL
    // if (pathname.startsWith('/create') || pathname.startsWith('/session') || pathname.startsWith('/oldsession')) {

    //     if(!payload || payload.error === 'expired')
    //     {
    //         const url = new URL('/', req.url)
    //         return NextResponse.redirect(url)
    //     }
    // }

    // // SESSION CONTROL
    // if (pathname.startsWith('/session') && payload) 
    // {
    //     const userId = payload.userId
    //     const sessionId = req.nextUrl.pathname.split('/')[2]

    //     const response = await fetch(`${BASE}/api/livesessions`,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'X-User-Id': userId,
    //                 'X-Session-Id': sessionId,
    //             },
    //         }
    //     )

    //     response.status == 200 ? NextResponse.next() : NextResponse.redirect('/')
    // }


    
    
    // // IF TOKEN NOT EXIST OR VALID
    // if(!payload)
    // {
    //     const response = await fetch(`${BASE}/api/user`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
        
    //     if (response.ok) {
    //         const data = await response.json()
    //         const accessToken = data.accessToken
    //         const refreshToken = data.refreshToken

    //         const res = NextResponse.next()

    //         res.cookies.set('accessToken', accessToken, {
    //             httpOnly: true,
    //             secure: false,
    //             sameSite: 'lax',
    //             path: '/',
    //             maxAge: 31536000,
    //         })
    //         res.cookies.set('refreshToken', refreshToken, {
    //             httpOnly: true,
    //             secure: false,
    //             sameSite: 'lax',
    //             path: '/',
    //             maxAge: 31536000, // 1 year
    //         })
    //         return res
    //     }
    // }

    return NextResponse.next()
}

export const config = {
    matcher: '/:language/:practice',
}