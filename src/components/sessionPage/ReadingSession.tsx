"use client"

// COMPONENTS
import ReadingPdfViewerComponent from "./ReadingPdfViewer"
import ReadingFormComponent from "./ReadingFormComponent"
import TableComponent from "../detailPage/table"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

export default function ReadingSessionComponent({item} : any) {

    //STORE
    const {SessionData} = GlobalStore()

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-gray-50">
                    <ReadingPdfViewerComponent item={item}/>
                    <ReadingFormComponent item={item}/>
                </div>
                <div>
                    <TableComponent type="book" columns={["Selected", "Answer" ,"Translate", "Similarity"]} contents={SessionData.rows}/>
                </div>
            </div>
        </>
    )
}