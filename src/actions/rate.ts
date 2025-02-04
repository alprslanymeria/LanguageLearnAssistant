"use server"

import stringSimilarity from 'string-similarity'


export async function rate(selectedText : string, translatedText: string){

    const similarity = stringSimilarity.compareTwoStrings(selectedText, translatedText)
    return similarity;
}