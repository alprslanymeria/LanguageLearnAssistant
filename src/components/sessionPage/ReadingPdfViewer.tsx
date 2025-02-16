"use client"

// REACT & NEXT
import { useState, useEffect } from "react"
// COMPONENTS
import ShowErrorComponent from "../utils/showError"
// PDF VİEWER
import { Viewer , Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

export default function ReadingPdfViewerComponent({item} : any) {

    const defaultLayoutPluginInstance = defaultLayoutPlugin()

    //STATES
    const [pdfData, setPdfData] = useState<any>(null)
    const [error , setError] = useState<any>(null)
    
    //GET PDF DATA
    useEffect(() => {

        const fetchPdf = async () => {

            try {

                const response = await fetch(item.sourceUrl)
                const blob = await response.blob()
                const base64Data = await convertBlobToBase64(blob)
                setPdfData(base64Data)

            } catch (error) {
                setError(error)
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

    if(error) return <ShowErrorComponent error={error} errorDetails={""}/>

    return (

        <>
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
        </>
    )
}