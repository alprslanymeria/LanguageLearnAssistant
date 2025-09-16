"use client"

// TYPES
import { AlertComponentProps } from "@/src/components/AlertComponent/prop"
// 3RD PARTY
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
// REDUCER & HANDLER & CUSTOM EFFECTS
import { useAlertReducer } from "@/src/components/AlertComponent/useAlertReducer"
import { UseAlertComponentCustomEffect } from "@/src/components/AlertComponent/useAlertComponentCustomEffect"


const alertStyles = {

  info: "border-blue-500 text-blue-800 bg-blue-50",
  success: "border-green-500 text-green-800 bg-green-50",
  warning: "border-yellow-500 text-yellow-800 bg-yellow-50",
  error: "border-red-500 text-red-800 bg-red-50",

}

const iconMap = {

  info: <Info className="w-6 h-6 text-blue-600" />,
  success: <CheckCircle2 className="w-6 h-6 text-green-600" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
  error: <XCircle className="w-6 h-6 text-red-600" />,

}

export default function AlertComponent (params : AlertComponentProps)  {

  const {type = "info", message, title, duration = 2000, onClose} = params
  
  // HOOKS
  const {state, dispatch} = useAlertReducer()

  //USE EFFECTS
  UseAlertComponentCustomEffect({duration, onClose, dispatch})
  
  if (!state.visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className={`w-full max-w-md mx-auto rounded-xl border p-5 shadow-lg ${alertStyles[type]} flex gap-4 items-start animate-fade-in`}
      >
        <div className="pt-1">{iconMap[type]}</div>
        <div className="flex-1">
          {title && <h3 className="font-bold text-lg">{title}</h3>}
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}