"use client"

import WritingPdfViewer from "./WritingPdfViewer"

export default function WritingSession({item} : any) {

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <WritingPdfViewer item={item}/>
            </div>
        </>
    )
}