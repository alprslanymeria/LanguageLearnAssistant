"use client"

// TYPES
import { showErrorPropTypes } from "@/src/types/prop"

export default function ShowError({ error, errorDetails } : showErrorPropTypes) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error</strong>
            <span className="block sm:inline">{error}</span>
            <span className="block sm:inline">{errorDetails}</span>
        </div>
    )
}