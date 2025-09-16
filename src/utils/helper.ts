
export function calculateFlashcardSuccessRate( rows: { status: boolean }[] ) : number {

  if (rows.length === 0) return 0

  const successCount = rows.filter(row => row.status).length

  return (successCount / rows.length) * 100
}

export function calculateSuccessRate(rows: { similarity?: number }[]): number {

  if (rows.length === 0) return 0

  const totalSimilarity = rows.reduce((sum, row) => sum + (row.similarity ?? 0), 0)

  return (totalSimilarity / rows.length) * 100
}


export function getErrorMessageLogin(errorCode: string) {
    switch (errorCode) {
        case 'code_1':
            return 'UNEXPECTED ERROR!'
        case 'code_3':
            return 'INVALID EMAIL OR PASSWORD!'
        case 'code_6':
            return 'PLEASE CHECK EMAIL FORMAT!'
        case 'code_7':
            return 'PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS!'
        default:
            return 'SERVER ERROR'
    }
}

export function getErrorMessageSignup(errorCode: string) {

    switch (errorCode) {
        case 'code_1':
            return 'UNEXPECTED ERROR!'
        case 'code_2':
            return 'USER ALREADY EXIST!'
        case 'code_4':
            return 'PLEASE CHECK EMAIL FORMAT!'
        case 'code_5':
            return 'PASSWORD CAN NOT BE SHORTER THAN 8 CHARACTERS!'
        default:
            return 'SERVER ERROR'
    }
}