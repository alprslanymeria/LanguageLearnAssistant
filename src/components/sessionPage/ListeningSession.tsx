"use client"

// COMPONENTS
import TableComponent from "../detailPage/table"
import ListeningFormComponent from "./ListeningFormComponent"
import PlayerComponent from "./PlayerComponent"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

export default function ListeningSessionComponent({item} : any) {

    //STORE
    const {SessionData} = GlobalStore()

    return (

        <div className="max-w-6xl mx-auto p-4 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2 flex justify-center">
                    <PlayerComponent item={item}/>
                </div>

                <div className="lg:w-1/2">
                    <ListeningFormComponent item={item}/>
                </div>
            </div>

            <div>
                <TableComponent type="listening" columns={["Listened", "Answer" , "Similarity"]} contents={SessionData.rows}/>
            </div>
        </div>
    )
}


//İLK ÖNCE SAYFA İLK YÜKLENDİĞİNDE:
// - item.strUrl dosyası indirilecek
// - parseSubtitleToJson(fileText) fonksiyonu ile altayzı dosyası JSON formatına çevrilecek
    // - start : number
    // - end : number
    // - text : string
// - parseVideo(subtitleJson) fonksiyonu ile video cümlelere göre bölünecek
    // - sentenceStart : number
    // - sentenceEnd : number


//ITEM ÖRNEĞİ
// {
//     "id": 1,
//     "listeningId": 10,
//     "name": "Film 1",
//     "imageUrl": "https://example.com/image1.jpg",
//     "sourceUrl": "https://example.com/source1.mp4",
//     "listening": {
//         "id": 10,
//         "userId": "user123",
//         "languageId": 2,
//         "practiceId": 5
//     }
// },