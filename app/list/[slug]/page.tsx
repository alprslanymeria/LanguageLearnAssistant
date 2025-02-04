"use client"

// REACT & NEXT
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
// ACTIONS
import { GetAllFCategories, GetAllFWords, GetAllLFilms, GetAllRBooks, GetAllWBooks } from "@/src/actions/list";4
// COMPONENTS
import ListTable from "@/src/components/crudPages/listTable";
import ShowError from "@/src/components/utils/showError";
import { useParams, useRouter } from "next/navigation";

export default function List() {

    // GET SLUG
    const params = useParams()
    const slug = params.slug

    // SESSION
    const session = useSession();
    const userId = session.data?.user.userId

    // STATES
    const [items, setItems] = useState<any>([])
    const [contents, setContents] = useState<any>([])
    const [columnNames, setColumnNames] = useState<string[]>([])
    const [table, setTable] = useState("")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    // GET DATA
    useEffect(() => {

        const GET = async () => {

            let response = null

            switch(slug) {
                case "rbooks":
                    response = await GetAllRBooks(userId)
                    if(response?.status === 200)
                    {
                        setItems(response.data)
                        setIsLoading(false)
                        setTable("rbooks")
                        setColumnNames(["Name", "Image"])
                        setContents([
                                        (item: any) => <span>{item.name}</span>,
                                        (item: any) => <Image alt="" width={100} height={100} src={item.imageUrl}></Image>
                                    ])
                    }
                    setError(response?.message ?? null);
                    setErrorDetails(response?.details ?? null);
                    setIsLoading(false)
                    break;
                case "wbooks":
                    response = await GetAllWBooks(userId)
                    if(response?.status === 200)
                    {
                        setItems(response.data)
                        setIsLoading(false)
                        setTable("wbooks")
                        setColumnNames(["Name", "Image"])
                        setContents([
                                        (item: any) => <span>{item.name}</span>,
                                        (item: any) => <Image alt="" width={100} height={100} src={item.imageUrl}></Image>
                                    ])
                    }
                    setError(response?.message ?? null);
                    setErrorDetails(response?.details ?? null);
                    setIsLoading(false)
                    break;
                case "lfilms":
                    response = await GetAllLFilms(userId)
                    if(response?.status === 200)
                    {
                        setItems(response.data)
                        setIsLoading(false)
                        setTable("lfilms")
                        setColumnNames(["Name", "Image"])
                        setContents([
                                        (item: any) => <span>{item.name}</span>,
                                        (item: any) => <Image alt="" width={100} height={100} src={item.imageUrl}></Image>
                                    ])
                    }
                    setError(response?.message ?? null);
                    setErrorDetails(response?.details ?? null);
                    setIsLoading(false)
                    break;
                case "fcategories":
                    response = await GetAllFCategories(userId)
                    if(response?.status === 200)
                    {
                        setItems(response.data)
                        setIsLoading(false)
                        setTable("fcategories")
                        setColumnNames(["Name"])
                        setContents([
                                        (item: any) => <span className="text-gray-800">{item.name}</span>
                                    ])
                    }
                    setError(response?.message ?? null);
                    setErrorDetails(response?.details ?? null);
                    setIsLoading(false)
                    break;
                case "fwords":
                    response = await GetAllFWords(userId)
                    if(response?.status === 200)
                    {
                        setItems(response.data)
                        setIsLoading(false)
                        setTable("fwords")
                        setColumnNames(["Question", "Answer"])
                        setContents([
                                        (item: any) => <span className="text-gray-800">{item.question}</span>,
                                        (item: any) => <span className="text-gray-800">{item.answer}</span>
                                    ])
                    }
                    setError(response?.message ?? null);
                    setErrorDetails(response?.details ?? null);
                    setIsLoading(false)
                    break;
                default:
                    setError("Invalid slug")
                    setIsLoading(false)
                    break;
            }
        }

        GET()

    }, [slug])

    if(isLoading) return <></>

    if(error && error !== "") return <ShowError error={error} errorDetails={errorDetails}/>

    return (

        <ListTable  width={500} columnNames={columnNames} items={items} contents={contents} table={table}/>

    );
}