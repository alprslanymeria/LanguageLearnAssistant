"use client"

// COMPONENTS
import InfoMessageComponent from "@/src/components/InfoMessageComponent/infoMessage"
import FlagComponent from "@/src/components/FlagComponent/flag"
import Loader from "@/src/components/loader"
// REDUCER & HANDLERS & CUSTOM USE EFFECTS
import { useHomePageReducer } from "@/src/page/HomePage/useHomePageReducer"
import { useHomePageCustomEffect } from "@/src/page/HomePage/useHomePageCustomEffect"
// PROVIDER
import { useAlert } from "@/src/providers/AlertProvider/AlertProvider"
import { useLoading } from "@/src/providers/LoadingProvider/LoadingProvider"
// STORE
import { GlobalStore } from "@/src/store/globalStore"



export default function HomePage() {

  // HOOKS
  const {isLoading, loadingSource, setLoading} = useLoading()
  const {state, dispatch} = useHomePageReducer()
  const {showAlert} = useAlert()

  // STORE
  const hasHydrated = GlobalStore((state) => state.HasHydrated)
  const resetExcept = GlobalStore((state) => state.resetExcept)


  // USE EFFECT
  useHomePageCustomEffect({

    hasHydrated,
    showAlert,
    setLoading,
    resetExcept,
    dispatch
    
  })

  if(isLoading && loadingSource === "page" ) return <Loader/>

  return (
    <>
      <InfoMessageComponent message="Please choose which language you would like to learn"/>
      <FlagComponent languages={state.languages!}/>
    </>
  )
}