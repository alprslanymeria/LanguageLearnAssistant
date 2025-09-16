"use server"

// 3RD PARTY
import stringSimilarity from 'string-similarity'
// TYPES
import { CalculateRateProps } from '@/src/types/actions'
import { ApiResponse } from '@/src/types/response'
// UTILS
import { createResponse } from '@/src/utils/response'
// ZOD
import { CalculateRateSchema } from '@/src/zod/actionsSchema'


export async function CalculateRate(params : CalculateRateProps) : Promise<ApiResponse<number>> {

    try {

        await CalculateRateSchema.parseAsync(params)

        const {inputOne, inputTwo} = params

        const similarity = stringSimilarity.compareTwoStrings(inputOne, inputTwo)

        return createResponse(true, 200, similarity, "SUCCESS: CalculateRate")
        
    } catch (error) {
        
        console.log(`ERROR: CalculateRate: ${error}`)
        return createResponse<number>(false, 500, null, "ERROR: CalculateRate!")
    }
}