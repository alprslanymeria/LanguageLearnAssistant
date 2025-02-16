"use client"

// REACT & NEXT
import { useRef, useEffect } from "react"
// STORE
import { GlobalStore } from "@/src/store/globalStore"

export default function PlayerComponent({item} : any) {

    //REFS
    const videoRef = useRef<HTMLVideoElement>(null)

    //STORE
    const {SessionData, updateSessionData} = GlobalStore()

    //USE EFFECT
    useEffect(() => {

        const GET = async () => {

            if(item.strUrl != null)
            {
                //DOWNLOAD SUBTITLE FILE
                const fileResponse = await fetch(item.strUrl)
                const fileText = await fileResponse.text()
                parseSubtitleToJson(fileText)
                return
            }
        }

        GET()

    }, [])


    //FUNCTIONS
    const parseSubtitleToJson = (subtitleText : string) => {
        
        const subtitles : any = []
        let currentSubtitle : any = null
    
        //SPLIT TO LINES
        const lines = subtitleText.split('\r')
        
        //PARSE LINES
        lines.forEach((line : any) => {

            if (line.includes(' --> ')) 
            {

                if (currentSubtitle) subtitles.push(currentSubtitle)
                
                currentSubtitle = {
                    start: convertTimestampToSeconds(line.split(' --> ')[0].trim()),
                    end: convertTimestampToSeconds(line.split(' --> ')[1].trim()),
                    text: ''
                }
            } 
            else if (currentSubtitle) 
            {
                if (!line.includes(' --> ')) currentSubtitle.text += (currentSubtitle.text ? ' ' : '') + line.trim()
            }
        })
    
        if (currentSubtitle) subtitles.push(currentSubtitle);
    
        updateSessionData("subtitleJson", subtitles)
        parseVideoBySentence(subtitles)
    }

    const parseVideoBySentence = (subtitles : any) => {

        let sentenceStart = 0

        const newSentences : any = []

        subtitles.forEach((subtitle: any) => {
            if (subtitle.text.includes(".")) {
                newSentences.push({
                    sentenceStart: sentenceStart,
                    sentenceEnd: subtitle.end,
                })

                sentenceStart = subtitle.end
            }
        })

        updateSessionData("sentences", newSentences)
    }

    const extractTextFromSubtitle = (startTime: number, endTime: number) => {

        const texts = SessionData.subtitleJson
            .filter((subtitle: any) => subtitle.start >= startTime && subtitle.end <= endTime)
            .map((subtitle: any) => subtitle.text)

        const text = texts.join(' ')
    
        updateSessionData("extractedText", text)
        
    }

    const convertTimestampToSeconds = (timestamp: string) => {

        const [hours, minutes, seconds] = timestamp.split(':').map(parseFloat)
        return hours * 3600 + minutes * 60 + seconds
    }


    //EVENTS
    const handlePlay = () => updateSessionData("lastPlayTime", videoRef.current?.currentTime || 0)

    const handlePause = () => {

        const currentPauseTime = videoRef.current?.currentTime || 0
        updateSessionData("lastPauseTime", currentPauseTime)
        extractTextFromSubtitle(SessionData.lastPlayTime, currentPauseTime)

    }

    const onTimeUpdate = () => {

        const currentTime = videoRef.current?.currentTime || 0
        const sentenceEnd = SessionData.sentences[SessionData.sentenceIndex].sentenceEnd

        if(sentenceEnd <= currentTime)
        {
            videoRef.current?.pause()
            updateSessionData("sentenceIndex", SessionData.sentenceIndex + 1)
        }
    }

    const handleEnded = () => updateSessionData("sentenceIndex", 0)

    return (
        
        <div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                <video
                ref={videoRef}
                className="w-full h-full"
                controls
                onPlay={handlePlay}
                onPause={handlePause}
                onTimeUpdate={onTimeUpdate}
                onEnded={handleEnded}
                src={item.sourceUrl}
                />
            </div>

            {/* Timestamp Display */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                        <span className="font-semibold">Last Play Time:</span>
                        <span className="ml-2">{SessionData.lastPlayTime.toFixed(2)}s</span>
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold">Last Pause Time:</span>
                        <span className="ml-2">{SessionData.lastPauseTime.toFixed(2)}s</span>
                    </div>
                </div>
            </div>
        </div>
    )
}