// SIGNIN REQUEST
export type SignInRequest = {

    Email: string
    Password: string
}

// SIGNUP REQUEST
export type SignUpRequest = {

    UserName: string
    Email: string
    Password: string
    NativeLanguageId: number
}

// TOKEN RESPONSE AFTER SIGNIN REQUEST
export type TokenResponse = {

    accessToken: string
    accessTokenExpiration: string
    refreshToken: string
    refreshTokenExpiration: string
}

// SERVICE RESULT FOR MAPPING RETURNED DATA AND ERROR MESSAGES
export type ApiServiceResult<T> = {

    data?: T
    errorMessage?: string[]
}

// JWT DECODED CLAIMS
export type JwtPayload = {

    [key: string]: unknown
}

// USER SESSION
export type UserSession = {

    userId: string
    userName: string
    email: string
}

// COOKIE NAMES
export const AUTH_COOKIES = {

    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
} as const
