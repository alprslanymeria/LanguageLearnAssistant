"use client"

// REACT & NEXT
import { createContext, useContext, useState, ReactNode } from "react"
// COMPONENTS
import AlertComponent from "@/src/components/AlertComponent/alertComponent"
// TYPES
import { AlertContextProps, AlertProviderProps, ShowAlertProps } from "@/src/providers/AlertProvider/prop"


// CUSTOM CONTEXT
const AlertContext = createContext<AlertContextProps | undefined>(undefined)

// PROVIDER
export function AlertProvider({ children }: AlertProviderProps) {
  
  const [alert, setAlert] = useState<ShowAlertProps | null>(null)

  const showAlert = ({duration = 2000, ...rest} : ShowAlertProps) =>  setAlert({ duration, ...rest })

  const handleClose = () => setAlert(null)

  return (

      <AlertContext.Provider value={{showAlert}}>
        {children}
        {alert && (

            <AlertComponent
                type={alert.type}
                title={alert.title}
                message={alert.message}
                duration={alert.duration}
                onClose={handleClose}
            />
        )}
      </AlertContext.Provider>
  )
}

// CUSTOM HOOK
export function useAlert() {

  const context = useContext(AlertContext)

  if (!context) throw new Error("useAlert must be used inside AlertProvider")

  return context
}


/*

- React’te useState, useReducer ve useContext, durum (state) yönetimiyle ilgili farklı ihtiyaçlara yönelik kullanılan hook’lardır. Hepsi farklı bir problemi çözer.
  - useState: Lokal ve basit state için kullanılır.
  - useReducer: Karmaşık state güncellemeleri için kullanılır.
  - useContext: Veriyi component tree’de prop drilling yapmadan paylaşmak için kullanılır.


- Bir bileşen bu createContext ile oluşturulan context nesnesini useContext() ile çağırdığında içerisindeki değerlere ulaşabilir.
- Context, veriyi kendisi oluşturmaz.
- Context sadece bir kanal açar: "Ben Provider ile bir veri alacağım ve bunu alt bileşenlere ileteceğim" der.


- Buradaki işleyiş şu şekildedir:
  - createContext ile alertContext oluşturulur. Burada sadece alertContext'in hangi değerleri içereceği ve ne tipte olacağı belirlenir. Herhangi bir değer başlatılmaz.
  - Bu verilerin tanımlanacağı kısım "AlertProvider" component'idir.
    - AlertContext.Provider'ın value değeri olarak alertContext'in sağlamış olduğu tüm değerleri vermeliyiz.
  - Bu provider ile uygulamamızı sararız. Böylece herhangi bir alt bileşen içerisinde useContext() kullanarak sağlamış olduğu değerleri kullanabilir oluyoruz.
  - Biz useContext'i de soyutlayarak useAlert adında custom hook oluşturup kullandık.

*/