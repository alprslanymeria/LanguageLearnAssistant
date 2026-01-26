"use client"

// ICONS
import { ChevronLeft, ChevronRight } from "lucide-react"
// TYPES
import { PaginationComponentProps } from "@/src/components/PaginationComponent/prop"

export default function PaginationComponent({ page, limit, total, onPageChange, onLimitChange }: PaginationComponentProps) {

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (

    <div className="flex justify-center items-center mt-6 space-x-4">

      {/*PREVIOUS BUTTON*/}
      <button

        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >

        <span className="hidden sm: inline">Prev</span>
        <ChevronLeft size={18} />

      </button> 

      {/*INFO SECTION*/}
      <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-xl shadow-inner">
        Page <span className="font-semibold text-indigo-600">{page}</span> / {totalPages}
      </span>


      {/*NEXT BUTTON*/}
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >

        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />

      </button>


      {/*LIMIT SELECTOR*/}
      {onLimitChange && (
        
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="ml-4 border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>

        </select>

      )}
      
    </div>
  )
}