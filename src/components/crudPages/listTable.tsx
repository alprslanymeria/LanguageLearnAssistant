"use client"

// REACT & NEXT
import { useState } from "react"
import { useRouter } from "next/navigation"
// COMPONENTS
import EditIcon from "@/src/components/svg/Edit"
import DeleteIcon from "@/src/components/svg/Delete"
import ShowErrorComponent from "../utils/showError"
//ACTIONS
import { DeleteById } from "../../actions/crud"
//TYPES
import { listTableComponentPropTypes } from "../../types/prop"

//BASE
const BASE = process.env.NEXT_PUBLIC_BASE_URL

export default function ListTableComponent({width, columnNames, contents, items, table} : listTableComponentPropTypes) {

    //HOOKS
    const router = useRouter()

    //STATES
    const [error, setError] = useState<string | null>("")
    const [errorDetails, setErrorDetails] = useState<string | null>(null)


    //FUNCTIONS
    const handleCreate = () => router.push(`${BASE}/add?table=${table}`)

    const handleEdit = (id : any) => router.push(`${BASE}/edit?id=${id}&table=${table}`)

    const handleDelete = async (id: any) => {

        const response = await DeleteById(id, table)
        
        if(response?.status === 200) router.push(`/list/${table}`)

        setError(response?.message ?? null);
        setErrorDetails(response?.details ?? null);
    }

    if(error && error !== "") return <ShowErrorComponent error={error} errorDetails={errorDetails}/>

    return (

        <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                <table style={{ width: `${width}px` }} className="table-auto bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">

                                {columnNames.map((name : any , index: any) => (
                                    <th key={index} className="px-4 py-2 text-center">{name}</th>
                                ))}

                                {/* CREATE BUTTON */}
                                <th className="px-4 py-2 text-center" style={{ width: '75px' }} colSpan={2}>
                                    <button 
                                        onClick={() => handleCreate()} 
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Create
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.length > 0 ? (
                                items.map((item : any, index : any) => (
                                    <tr key={index} className="hover:bg-gray-50">

                                        {contents.map((content : any, index: any) => (
                                            <td key={index} className="px-4 py-2 border-b text-center">{content(item)}</td>
                                        ))}

                                        <td className="px-4 py-2 border-b text-center">
                                            <button className="w-[30px]" onClick={() => handleEdit(item.id)}>
                                                <EditIcon/>
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <button className="w-[30px]" onClick={() => handleDelete(item.id)}>
                                                <DeleteIcon/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}