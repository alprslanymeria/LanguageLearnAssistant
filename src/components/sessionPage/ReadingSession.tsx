"use client"

import ReadingPdfViewer from "./ReadingPdfViewer"

export default function ReadingSession({item} : any) {

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <ReadingPdfViewer item={item}/>
            </div>
        </>
    )
}