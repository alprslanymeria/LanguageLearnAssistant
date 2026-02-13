"use server"

// TYPES
import { SerializedServiceResult, SerializedServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { CompareLanguageIdRequest } from "./Request"
import { UserDto } from "./Response"
// UTLS
import { oauthFetch, oauthFetchForm } from "@/src/infrastructure/common/oauthFetch"


export async function UpdateProfileInfos(formData: FormData) : Promise<SerializedServiceResultBase> {

    return await oauthFetchForm("/api/User", { 
        
        method: "PUT", 
        body: formData 
    })
}

export async function CompareLanguageId(request: CompareLanguageIdRequest) : Promise<SerializedServiceResult<boolean>> {

    return await oauthFetch<boolean>("/api/User/compare-language", { 
        
        method: "POST",
        body: JSON.stringify(request)
    })
}

export async function GetProfileInfos() : Promise<SerializedServiceResult<UserDto>> {

    return await oauthFetch<UserDto>(`/api/User`, { 
        
        method: "GET" 
    })
}