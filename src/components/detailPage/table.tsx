"use client"

//ICONS
import CheckIcon from "@/public/icons/checkIcon"
import FailIcon from "@/public/icons/failIcon"
//TYPES
import { tableComponentPropTypes } from "../../types/prop"

export default function TableComponent ({contents, columns, type}: tableComponentPropTypes) {

    return (

        <div className="mt-8 w-full bg-white">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column : any) => (
                            <th className="border border-gray-300 px-4 py-2">{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {type === "book" && contents.map((sentence: any, index : any) => (
                        <tr key={sentence.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{sentence.selectedSentence}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.answer}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.answerTranslate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(sentence.similarity * 100).toFixed(2)}%</td>
                        </tr>
                    ))}

                    {type === "listening" && contents.map((sentence: any, index : any) => (
                        <tr key={sentence.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{sentence.listenedSentence}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.answer}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(sentence.similarity * 100).toFixed(2)}%</td>
                        </tr>
                    ))}

                    {type === "flashcard" && contents.map((content : any, index : any) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{content.question}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{content.answer}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{content.status ? <CheckIcon/> : <FailIcon/>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}