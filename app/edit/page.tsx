"use client"

// REACT & NEXT
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
//ACTIONS
import { GetItemById } from "@/src/actions/crud"
//COMPONENTS
import CrudFormComponent from "@/src/components/crudForm"
import ShowErrorComponent from "@/src/components/utils/showError"

export default function Page(){

    return (
        <Suspense fallback={<div>Yükleniyor...</div>}>
            <EditPage/>
        </Suspense>
    )
}


function EditPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const table = searchParams.get("table")

    //STATES
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)
    //FORM STATES
    const [formData, setFormData] = useState({})
    const [formHeading, setFormHeading] = useState("")
    const [labelNames, setLabelNames] = useState<string[]>([])
    const [isHidden, setIsHidden] = useState<boolean[]>([])

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //FUNCTIONS
    const handlerFormData = (item : any, categories : any) => {

        switch(table) {
        
            case "rbooks":
                setFormData({languageId: item.reading.languageId, input1: item.name, file1: item.imageUrl, file2: item.sourceUrl})
                setFormHeading("Reading Book Edit")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf" ,""])
                setIsHidden([true, false, true, false, true, true, false])
                break
            case "wbooks":
                setFormData({languageId: item.writing.languageId, input1: item.name, file1: item.imageUrl, file2: item.sourceUrl})
                setFormHeading("Writing Book Edit")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf", ""])
                setIsHidden([true, false, true, false, true, true, false])
                break
            case "lfilms":
                setFormData({languageId: item.listening.languageId, input1: item.name, file1: item.imageUrl, file2: item.sourceUrl, file3: item.strUrl})
                setFormHeading("Film Edit")
                setLabelNames(["Language","", "Film Name", "", "Film Image", "Film Video", "Subtitle File"])
                setIsHidden([true, false, true, false, true, true, true])
                break
            case "fcategories":
                setFormData({languageId: item.flashcard.languageId, input1: item.name})
                setFormHeading("Flashcard Category Edit")
                setLabelNames(["Deck", "", "Category", "", "", "", ""])
                setIsHidden([true, false, true, false, false, false, false])
                break
            case "fwords":
                setFormData({languageId: item.category.flashcard.languageId, input1: item.question, input2: item.answer, categoryId: item.categoryId, categories: categories})
                setFormHeading("Word Edit")
                setLabelNames(["Language", "Deck", "Word", "Answer", "", "", ""])
                setIsHidden([true,true, true, true, false, false, false])
                break
        }
    }

    //EFFECTS
    useEffect(() => {

        const GET = async () => {

            const response = await GetItemById(table, id, userId)

            if(response?.status === 200)
            {
                handlerFormData(response.data, response.categories)
                setIsLoading(false)
                
                return
            }

            setError(response?.message ?? null)
            setErrorDetails(response?.details ?? null)
            setIsLoading(false)
        }

        GET()

    }, [table, id])


    if(isLoading) return <></>
    
    if(error != "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <CrudFormComponent 
            formHeading={formHeading} 
            labelNames={labelNames} 
            isHidden={isHidden} 
            formData={formData} 
            setFormData={setFormData}
            table={table}
            itemId={id}
            userId={userId}
            type="Edit">
        </CrudFormComponent>
    )
}