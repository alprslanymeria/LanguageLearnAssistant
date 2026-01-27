// TYPES
import { ShowAlertProps } from "@/src/infrastructure/providers/AlertProvider/prop"
import { setLoadingProps } from "@/src/infrastructure/providers/LoadingProvider/prop"
import { ServiceResult } from "@/src/infrastructure/common/ServiceResult"
import { LanguageDto } from "@/src/actions/Language/Response"
import { UserDto } from "@/src/actions/User/Response"

// REDUCER
export type State = {

  languages: LanguageDto[]
  user: UserDto | null
  profileImage: File | string | null
  name: string
  nativeLanguageId: number
}

export type Action =
  | { type: "SET_LANGUAGES", payload: {languages: LanguageDto[]} }
  | { type: "SET_USER", payload: {user: UserDto} }
  | { type: "SET_PROFILE_IMAGE", payload: {profileImage: File | string} }
  | { type: "SET_NAME", payload: {name: string} }
  | { type: "SET_NATIVE_LANGUAGE_ID", payload: {nativeLanguageId: number} }


// USE EFFECTS
export type UseProfilePageCustomEffectProps = {

    userId: string | undefined
    state: ServiceResult<string> | undefined
    showAlert: (props: ShowAlertProps) => void
    setLoading: (props: setLoadingProps) => void
    dispatch: (action: Action) => void
}
