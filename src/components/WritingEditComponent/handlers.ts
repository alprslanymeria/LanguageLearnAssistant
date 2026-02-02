// TYPES
import { UpdateWritingBook } from "@/src/actions/WritingBook/Controller"
import { HandleFileChangeOneProps, HandleFileChangeTwoProps, HandleSubmitProps } from "@/src/components/WritingEditComponent/prop"

export async function handleSubmit( params: HandleSubmitProps) {

    const {e, dispatch, setLoading} = params

    const kese = [e]

    if(kese.some(k => !k)) return

    e.preventDefault()

    setLoading({value: true , source: "WritingEditHandleSubmit"})

    const formData = new FormData(e.currentTarget)

    const response =  await UpdateWritingBook( formData )

    dispatch({type: "SET_STATE", payload: {state: response}})

    setLoading({value: false})

}

export function handleFileChangeOne(params : HandleFileChangeOneProps) {

    const {e, dispatch} = params

    const file = e.target.files[0]
    const maxSize = 50 * 1024 * 1024
    const allowedTypes = [
    'image/png', 
    'image/jpeg',
    ]

    if (file) {

        if (file.size > maxSize) {

            dispatch({type: "SET_FILE_ERROR" , payload: {fileError: "File size must be less than 50MB!"}})
            return
        }

        if (!allowedTypes.includes(file.type)) {
            
            dispatch({type: "SET_FILE_ERROR" , payload: {fileError: "You can only upload PNG and JPG files!"}})
            return
        }


        dispatch({type: "SET_FILE_ONE", payload: {fileOne: file}})
    }

}

export function handleFileChangeTwo(params : HandleFileChangeTwoProps) {

    const {e, dispatch} = params
    
    const file = e.target.files[0]
    const maxSize = 50 * 1024 * 1024
    const allowedTypes = [
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm'
    ];

    if (file) {

        if (file.size > maxSize) {

            dispatch({type: "SET_FILE_ERROR" , payload: {fileError: "File size must be less than 50MB!"}})
            return
        }

        if (!allowedTypes.includes(file.type)) {

            dispatch({type: "SET_FILE_ERROR" , payload: {fileError: "You can only upload PDF, MP4, MOV, AVI and WebM files!"}})
            return
        }

        dispatch({type: "SET_FILE_TWO", payload: {fileTwo: file}})
    }
}