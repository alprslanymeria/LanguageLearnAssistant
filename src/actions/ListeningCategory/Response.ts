// IMPORTS
import { DeckVideoDto } from "@/src/actions/DeckVideo/Response"

export type ListeningCategoryDto = {

    id: number,
    listeningId: number,
    name: string
}

export type ListeningCategoryWithDeckVideos = {

    id: number
    name: string
    listeningId: number
    deckVideos: DeckVideoDto[]
}