"use client"

// ICONS
import CheckIcon from "@/public/icons/checkIcon"
import FailIcon from "@/public/icons/failIcon"
// TYPES
import { TableComponentPropTypes } from "@/src/components/TableComponent/prop"
// COMPONENTS
import PaginationComponent from "@/src/components/PaginationComponent/PaginationComponent"

export default function TableComponent({contents, columns, type, page, limit, total, dispatch}: TableComponentPropTypes) {

    return (

        <div className="mt-8 w-full bg-white">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column : string, index: number) => (
                            <th key={index} className="border border-gray-300 px-4 py-2">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {type === "readingBook" && contents.map((row) => (
                        <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{row.selectedSentence}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.answer}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.answerTranslate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(row.similarity! * 100).toFixed(2)}%</td>
                        </tr>
                    ))}

                    {type === "writingBook" && contents.map((row) => (
                        <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{row.selectedSentence}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.answer}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.answerTranslate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(row.similarity! * 100).toFixed(2)}%</td>
                        </tr>
                    ))}

                    {type === "listening" && contents.map((row) => (
                        <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{row.listenedSentence}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.answer}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(row.similarity! * 100).toFixed(2)}%</td>
                        </tr>
                    ))}

                    {type === "flashcard" && contents.map((row) => (
                        <tr className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{row.question}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{row.answer}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{row.status ? <CheckIcon/> : <FailIcon/>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationComponent
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => dispatch({ type: "SET_PAGE", payload: { page: newPage } })}
                onLimitChange={(newLimit) => dispatch({ type: "SET_LIMIT", payload: { limit: newLimit } })}
            />
        </div>
    )
}