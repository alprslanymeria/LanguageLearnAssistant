// TYPES
import { HandleCreateClickProps } from "@/src/page/PracticePage/prop"

export async function handleCreateClick(params: HandleCreateClickProps) {

    const {router} = params

    router.push(`/create`)

}