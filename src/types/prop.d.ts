import { Practice, Language, FlashcardSessionRow, ReadingSessionRow, WritingSessionRow, ListeningSessionRow, FlashcardCategory, ReadingBook, WritingBook, ListeningFilm } from "@prisma/client"
import InfoMessageComponent from "../components/utils/infoMessage"

//Layout.tsx
export type rootLayout = {
    children : React.ReactNode
}

//infoMessage.tsx
export type infoMessageComponentPropTypes = {
    message : string
}

//showError.tsx
export type showErrorPropTypes = {
    error: string | null | undefined
    errorDetails: string | null | undefined
}

//email.tsx
export type emailPropTypes = {
    email : string | undefined | null 
    userId : string | undefined | null
}

//menu.tsx
export type menuPropTypes = {
    email : string | undefined | null 
    userId : string | undefined | null
}

//flag.tsx
export type flagComponentPropTypes = {
    languages : Language[]
}



//languagePage.tsx
export type languagePagePropTypes = {
    language : string | null
}

//practice.tsx
export type practiceComponentPropTypes = {
    practices : Practice[]
    language : string | null
}

//practicePage.tsx
export type practicePagePropTypes = {
    language : string | null
    practice : string | null
}

//oldSession.tsx
export type oldSessionComponentPropTypes = {
    language : string | null
    practice : string | null 
}

//practiceCard.tsx
export type practiceCardComponentPropTypes = {
    item : any
    index : number
}

//table.tsx
export type tableComponentPropTypes = {
    contents: FlashcardSessionRow[] |  ReadingSessionRow[] | WritingSessionRow[] | ListeningSessionRow[]
    columns: string[]
    type: string
}

//listTable.tsx
export type listTableComponentPropTypes = {
    width: number
    columnNames: string[]
    items: FlashcardCategory[] | ReadingBook[] | WritingBook[] | ListeningFilm[]
    contents: any[]
    table: string
}

//crudForm.tsx
export type crudFormComponentPropTypes = {
    formHeading: string
    labelNames: string[]
    isHidden: boolean[]
    formData: any
    setFormData: any
    table: string | null
    itemId: string | null
    userId: string | null | undefined
    type: string
}

//alertComponent.tsx
type AlertType = "info" | "success" | "warning" | "error";

export type AlertProps = {
  type?: AlertType;
  message: string;
  title?: string;
  duration?: number;
  onClose?: () => void;
}