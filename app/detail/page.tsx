"use client"

// REACT & NEXT
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
//ACTIONS
import { GetRowsById } from "@/src/actions/rows"
//COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import FilmSvg from "@/src/components/svg/FilmSvg"
import TableComponent from "@/src/components/detailPage/table"
import ShowErrorComponent from "@/src/components/utils/showError"


export default function DetailPage() {

    //SEARCH PARAMS
    const searchParams = useSearchParams()
    const language = searchParams.get("language")
    const practice = searchParams.get("practice")
    const id = searchParams.get("id")

    //SESSION
    const session = useSession()
    const userId = session.data?.user.userId

    //STATES
    const [contents, setContents] = useState<any>(null)
    const [item, setItem] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    // GET ROWS
    useEffect(() => {

        const GET = async () => {

            let response = null

            response = await GetRowsById(language, practice, userId, id)

            if(response && response.status == 200)
            {
                setContents(response.data)
                setItem(response.item)
                setIsLoading(false)
                return
            }

            setIsLoading(false)
            setError(response?.message ?? null)
            setErrorDetails(response?.details ?? null)  
        }

        GET()

    }, [language, practice, userId, id, isLoading])

    if(isLoading) return <></>

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return(

        <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row px-4 gap-10">
            <div className="relative h-[450px] flex-none w-[300px] self-center md:self-start">

                {practice == 'flashcard'
                 ? <DeckSvg language={language} text={item.name}/>
                 : practice == 'listening'
                 ? <FilmSvg imagePath={item.imageUrl} index={0}/>
                 : <BookSvg imagePath={item.imageUrl} color={item.leftColor}/>
                 }
                 
            </div>
            
            <div className="flex-[2]">
                {practice == "reading" || practice == "writing" 
                ? <TableComponent contents={contents} type="book" columns={["Sentence", "Answer", "Translate", "Similarity"]}/>
                :practice == "flashcard" 
                ?  <TableComponent contents={contents} type="flashcard" columns={["Question", "Answer", "Status"]}/>
                :practice == "listening"
                ?  <TableComponent contents={contents} type="listening" columns={["Listened Sentence", "Answer", "Similarity"]}/>
                : <p></p>}
            </div>
        </div>
    )
}