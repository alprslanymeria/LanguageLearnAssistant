"use client"

import { ReadingBookDto } from "@/src/actions/ReadingBook/Response"
import { ReadingSessionRowDto } from "@/src/actions/ReadingSessionRow/Response"
import { WritingBookDto } from "@/src/actions/WritingBook/Response"
import { WritingSessionRowDto } from "@/src/actions/WritingSessionRow/Response"


type BookSvgProps = {

    reading?: { item: ReadingBookDto , contents: ReadingSessionRowDto[] | undefined} | null
    writing?: { item: WritingBookDto , contents: WritingSessionRowDto[] | undefined } | null
}

// BURADA VIEWBOX DEĞERLERİNDEKİ SON İKİ DEĞER SIRASIYLA WIDTH VE HEIGHT DEĞERLERİDİR.
// İLK OLARAK SVG'NIN DEĞERLERİ ORAYA GİRİLİR. SVG EKRANDA TAM GÖZÜKECEK ŞEKİLDE KÜÇÜK OYNAMALAR YAPILIR.
// DAHA SONRA WIDTH DEĞERİ İSE NE KADAR BÜYÜK GÖZÜKMESİNİ İSTİYORSAK ONA GÖRE VERİLİR.

const BookSvg = ({reading , writing} : BookSvgProps) => {

    return (

        <svg width={250} viewBox="0 0 295 550" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.6112 94.4469V538.211L293.856 480.601V36.8369L34.6112 94.4469Z" fill="url(#pattern0_2124_43)"/>
        <path d="M34.6112 538.211V94.4469L1 58.0791V498.134L34.6112 538.211Z" fill={reading != null ? reading.item.leftColor : writing?.item.leftColor}/>
        <path d="M34.6112 94.4469L293.856 36.8369L258.784 0.793906L1 58.0791L34.6112 94.4469Z" fill="white"/>
        <path d="M34.6112 94.4469V538.211M34.6112 94.4469L293.856 36.8369M34.6112 94.4469L1 58.0791M34.6112 538.211L293.856 480.601V36.8369M34.6112 538.211L1 498.134V58.0791M293.856 36.8369L258.784 0.793904L1 58.0791" stroke="black"/>

        <g transform="skewY(-12.5)">
            <image 
            x="35" 
            y="103" 
            width="258"
            height="442"
            preserveAspectRatio="none"
            href= {reading != null ? reading.item.imageUrl : writing?.item.imageUrl}
            />
        </g>

        </svg>
    )
}

export default BookSvg