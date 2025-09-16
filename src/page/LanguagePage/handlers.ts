// TYPES
import { HandlePracticeClickProps } from "@/src/page/LanguagePage/prop"

export async function handlePracticeClick(params : HandlePracticeClickProps) {

    const {practice, language, router} = params

    const kese = [practice, language]

    if(kese.some(k => !k)) return

    router.push(`/practice/${practice.name}?language=${language}`)
}