"use client"

// COMPONENTS
import WritingPdfViewerComponent from "./WritingPdfViewer"
import WritingFormComponent from "./WritingFormComponent"
import TableComponent from "../detailPage/table"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

export default function WritingSessionComponent({item} : any) {

    //STORE
    const {SessionData} = GlobalStore()

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-gray-50">
                    <WritingPdfViewerComponent item={item}/>
                    <WritingFormComponent item={item}/>
                </div>
                <div>
                    <TableComponent type="book" columns={["Selected", "Answer" ,"Translate", "Similarity"]} contents={SessionData.rows}/>
                </div>
            </div>
        </>
    )
}