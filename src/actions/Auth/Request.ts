export type SignInRequest = {

    email: string,
    password: string
}

export type SignUpRequest = {

    name: string,
    email: string,
    password: string,
    nativeLanguageId: number
}