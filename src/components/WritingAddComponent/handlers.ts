// TYPES
import { HandleFileChangeOneProps, HandleFileChangeTwoProps } from "@/src/components/WritingAddComponent/prop"

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