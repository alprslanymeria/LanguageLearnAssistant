"use client"

// COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import FilmSvg from "@/src/components/svg/FilmSvg"
import { practiceCardComponentPropTypes } from "../../types/prop"

export default function PracticeCardComponent({ item, practice, language, index }: practiceCardComponentPropTypes) {

    switch (practice) {
        case 'reading':
          return <BookSvg imagePath={item.imageUrl} color={item.leftColor}></BookSvg> 
        case 'writing':
          return <BookSvg imagePath={item.imageUrl} color={item.leftColor}></BookSvg> 
        case 'flashcard':
          return <DeckSvg text={item.name} language={language} />;
        case 'listening':
          return <FilmSvg imagePath={item.imageUrl} index={index}></FilmSvg>
        default:
          return null;
      }
}