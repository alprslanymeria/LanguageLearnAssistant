"use client"

// REACT & NEXT
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
// ACTIONS
import { GetAllFCategories } from "@/src/actions/list"
// COMPONENTS
import CrudFormComponent from "@/src/components/crudForm"
import ShowErrorComponent from "@/src/components/utils/showError"

export default function AddPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const table = searchParams.get("table")

    //FORM STATES
    const [formData, setFormData] = useState({categories: []})
    const [formHeading, setFormHeading] = useState("")
    const [labelNames, setLabelNames] = useState<string[]>([])
    const [isHidden, setIsHidden] = useState<boolean[]>([])

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null | undefined>("")
    const [errorDetails, setErrorDetails] = useState<string | null | undefined>(null)

    //SESSION
    const session = useSession()
    const userId = session?.data?.user.userId

    useEffect(() => {

        switch(table) {

            case "rbooks":
                setFormHeading("Create Book")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf", ""])
                setIsHidden([true,false, true, false, true, true, false])
                setIsLoading(false)
                break
            case "wbooks":
                setFormHeading("Create Book")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf", ""])
                setIsHidden([true,false, true, false, true, true, false])
                setIsLoading(false)
                break
            case "lfilms":
                setFormHeading("Create Film")
                setLabelNames(["Language", "", "Film Name", "", "Film Image", "Film Video", "Subtitle File"])
                setIsHidden([true,false, true, false, true, true, true])
                setIsLoading(false)
                break
            case "fcategories":
                setFormHeading("Create Deck Category")
                setLabelNames(["Deck","", "Category", "", "", "", ""])
                setIsHidden([true,false, true, false, false, false, false])
                setIsLoading(false)
                break
            case "fwords":
                setFormHeading("Create New Word")
                setLabelNames(["Language","Deck", "Word", "Answer", "", "", ""])
                setIsHidden([true,true, true, true, false, false, false])
                setIsLoading(false)
        }

    }, [formHeading])

    useEffect(() => {

        const GET = async () => {

            const response = await GetAllFCategories(userId)
            
            if(response?.status == 200){
                setFormData({categories: response.data})
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError(response?.message)
            setErrorDetails(response?.details)
        }

        if(table == "fwords") GET()
            
    }, [userId])

    if(isLoading) return <></>

    if(error && error != "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>


    return (

        <CrudFormComponent
            formHeading={formHeading} 
            labelNames={labelNames} 
            isHidden={isHidden} 
            formData={formData} 
            setFormData={setFormData}
            table={table}
            itemId={null}
            userId={userId}
            type="Create">
        </CrudFormComponent>
    )
}