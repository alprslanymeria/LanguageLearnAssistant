"use client"

// COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import FilmSvg from "@/src/components/svg/FilmSvg"
// TYPES
import { practiceCardComponentPropTypes } from "../../types/prop"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

export default function PracticeCardComponent({ item, index }: practiceCardComponentPropTypes) {

    //STORE
    const {Language, Practice} = GlobalStore()

    switch (Practice) {
        case 'reading':
          return <BookSvg imagePath={item.imageUrl} color={item.leftColor}/>
        case 'writing':
          return <BookSvg imagePath={item.imageUrl} color={item.leftColor}/>
        case 'flashcard':
          return <DeckSvg text={item.name} language={Language}/>
        case 'listening':
          return <FilmSvg imagePath={item.imageUrl} index={index}/>
        default:
          return null
      }
}