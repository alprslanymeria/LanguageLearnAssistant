// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { SaveProfileInfosResponse, SelectedUser } from "@/src/types/actions"
import { ApiResponse } from "@/src/infrastructure/common/ServiceResult"
import { Language } from "@prisma/client"

// REDUCER
export type State = {

  languages: Language[]
  user: SelectedUser | null
  profileImage: File | string | null
  name: string
  nativeLanguageId: number
}

export type Action =
  | { type: "SET_LANGUAGES", payload: {languages: Language[]} }
  | { type: "SET_USER", payload: {user: SelectedUser} }
  | { type: "SET_PROFILE_IMAGE", payload: {profileImage: File | string} }
  | { type: "SET_NAME", payload: {name: string} }
  | { type: "SET_NATIVE_LANGUAGE_ID", payload: {nativeLanguageId: number} }


// USE EFFECTS
export type UseProfilePageCustomEffectProps = {

    userId: string | undefined
    state: ApiResponse<SaveProfileInfosResponse> | undefined
    showAlert: (props: ShowAlertProps) => void
    setLoading: (props: setLoadingProps) => void
    dispatch: (action: Action) => void
}
