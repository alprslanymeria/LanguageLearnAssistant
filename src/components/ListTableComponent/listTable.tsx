"use client"

// REACT & NEXT
import { useRouter } from "next/navigation"
// COMPONENTS
import EditIcon from "@/src/components/svg/Edit"
import DeleteIcon from "@/src/components/svg/Delete"
import PaginationComponent from "@/src/components/PaginationComponent/PaginationComponent"
//TYPES
import { ListTableComponentProps } from "@/src/components/ListTableComponent/prop"
import { Item } from "@/src/page/ListPage/prop"
// PROVIDER
import { useAlert } from "@/src/infrastructure/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/infrastructure/providers/LoadingProvider/LoadingProvider"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { handleCreate, handleDelete, handleEdit } from "@/src/components/ListTableComponent/handlers"


export default function ListTableComponent({width, columnNames, contents, items, table, state, dispatch} : ListTableComponentProps) {

    //HOOKS
    const router = useRouter()
    const {showAlert} = useAlert()
    const {isLoading, loadingSource, setLoading} = useLoading()

    return (

        <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex justify-center">
                <div className="overflow-x-auto">
                    <table style={{ width: `${width}px` }} className="table-auto bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">

                                {columnNames && columnNames!.map((name : string , index: number) => (
                                    <th key={index} className="px-4 py-2 text-center">{name}</th>
                                ))}

                                {/* CREATE BUTTON */}
                                <th className="px-4 py-2 text-center" style={{ width: '75px' }} colSpan={2}>
                                    <button 
                                        onClick={() => handleCreate({table, router})} 
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    >
                                        Create
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {items && items!.length > 0 ? (
                                items!.map((item: Item, index : number) => (
                                    <tr key={index} className="hover:bg-gray-50">

                                        {contents!.map((content : (item: Item) => any, index: number) => (
                                            <td key={index} className="px-4 py-2 border-b text-center">{content(item)}</td>
                                        ))}

                                        <td className="px-4 py-2 border-b text-center">
                                            <button className="w-[30px]" onClick={() => handleEdit({itemId: item.id , router, table})}>
                                                <EditIcon/>
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <button 
                                                disabled= {isLoading && loadingSource === "HandleDelete"}
                                                className="w-[30px]" 
                                                onClick={() => handleDelete({itemId: item.id , table, showAlert, setLoading, dispatch})}
                                            >
                                                {isLoading && loadingSource === "HandleDelete" ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-6 h-6 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                ) : (
                                                    <DeleteIcon/>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                    
                    <PaginationComponent
                        page={state.page}
                        limit={state.limit}
                        total={state.total}
                        onPageChange={(newPage) => dispatch({ type: "SET_PAGE", payload: { page: newPage } })}
                        onLimitChange={(newLimit) => dispatch({ type: "SET_LIMIT", payload: { limit: newLimit } })}
                    />
                        
                </div>
            </div>
        </div>
    )
}