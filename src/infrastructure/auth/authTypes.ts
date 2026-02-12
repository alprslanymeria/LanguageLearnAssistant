// SIGNIN REQUEST
export type SignInRequest = {

    email: string
    password: string
}

// SIGNUP REQUEST
export type SignUpRequest = {

    userName: string
    email: string
    password: string
    nativeLanguageId: number
}

// TOKEN RESPONSE AFTER SIGNIN REQUEST
export type TokenResponse = {

    accessToken: string
    accessTokenExpiration: string
    refreshToken: string
    refreshTokenExpiration: string
}

// USER DTO RESPONSE AFTER SIGNUP REQUEST
export type UserDto = {

    id: string
    userName: string | null
    email: string
    imageUrl: string | null
    nativeLanguageId: number
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
