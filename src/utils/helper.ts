// 3RD PARTY
import stringSimilarity from 'string-similarity'

// FOR FLASHCARD SUCCESS RATE
export function calculateFlashcardSuccessRate( rows: { status: boolean }[] ) : number {

  if (rows.length === 0) return 0

  const successCount = rows.filter(row => row.status).length

  return (successCount / rows.length) * 100
}

// FOR LISTENING SUCCESS RATE
export function calculateSimilarityRate(params : {inputOne: string, inputTwo: string}) : number {

    const similarity = stringSimilarity.compareTwoStrings(params.inputOne, params.inputTwo)

    return similarity
}

// FOR READING & WRITING & LISTENING SUCCESS RATE
export function calculateSuccessRate(rows: { similarity?: number }[]): number {

  if (rows.length === 0) return 0

  const totalSimilarity = rows.reduce((sum, row) => sum + (row.similarity ?? 0), 0)

  return (totalSimilarity / rows.length) * 100
}