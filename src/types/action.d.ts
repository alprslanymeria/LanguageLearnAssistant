// TYPE Language (ACTION METOT DÖNEN VERİ TİPİ)
export type Language = {
    id: number
    name: string
    imageUrl: string
};

// TYPE Practice (ACTION METOT DÖNEN VERİ TİPİ)
export type Practice = {
    id: number
    languageId: number
    name: string
}