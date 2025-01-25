import InfoMessageComponent from "../components/infoMessage"

export type showErrorPropTypes = {
    error: string | null
    errorDetails: string | null
}

export type emailPropTypes = {
    email : string | undefined | null 
    userId : string | undefined | null
}

export type hamburgerMenuPropTypes = {
    email : string | undefined | null 
    userId : string | undefined | null
}

export type infoMessageComponentPropTypes = {
    message : string
}

export type flagComponentPropTypes = {
    languages : Language[]
}