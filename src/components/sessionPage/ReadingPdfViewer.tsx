"use client"

import { useState, useEffect } from "react"
import { Viewer , Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TableComponent from "../detailPage/table"
import { GlobalStore } from "@/src/store/globalStore"
import ReadingFormComponent from "./ReadingFormComponent"

export default function ReadingPdfViewer({item} : any) {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    //STATES
    const [pdfData, setPdfData] = useState<any>(null)

    //STORE
    const {SessionData} = GlobalStore();

    //GET PDF DATA
    useEffect(() => {

        const fetchPdf = async () => {

            try {

                const response = await fetch(item.sourceUrl)
                const blob = await response.blob()
                const base64Data = await convertBlobToBase64(blob)
                setPdfData(base64Data)

            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        }

        fetchPdf()

    },[item.sourceUrl])


    const convertBlobToBase64 = (blob : any) => {

        return new Promise((resolve, reject) => {

            const reader = new FileReader()
            reader.onloadend = () => {

                resolve(reader.result)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })

    }

    return (

        <>
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-gray-50">
                <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2 bg-white overflow-hidden">
                    <div className="h-[600px] overflow-y-auto">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            {pdfData && 
                            
                                <Viewer 
                                    fileUrl={pdfData} 
                                    plugins={[defaultLayoutPluginInstance]}
                                />}
                        </Worker>
                    </div>
                </div>
                <ReadingFormComponent item={item}/>
            </div>
            <div>
                <TableComponent type="book" columns={["Selected", "Answer" ,"Translate", "Similarity"]} contents={SessionData.sessionSentences}/>
            </div>
        </>

    )
}