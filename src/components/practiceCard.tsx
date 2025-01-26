"use client"

// COMPONENTS
import BookSvg from "@/src/components/svg/BookSvg"
import DeckSvg from "@/src/components/svg/DeckSvg"
import FilmSvg from "@/src/components/svg/FilmSvg"

export default function PracticeCardComponent({ item, practice, language, index }: any) {

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