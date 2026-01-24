// IMPORTS
import { inject, injectable } from "inversify"
import sharp from "sharp"
import { Vibrant } from "node-vibrant/node"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { IImageProcessingService } from "./IImageProcessingService"

@injectable()
export class ImageProcessingService implements IImageProcessingService {

    // FIELDS
    private readonly logger : ILogger

    constructor(

        @inject(TYPES.Logger) logger : ILogger

    ) {

        this.logger = logger;
    }


    async extractLeftSideColorAsync(imageFile: File): Promise<string> {

        try {

            const arrayBuffer = await imageFile.arrayBuffer();

            // ARRAY BUFFER --> BUFFER<ARRAY BUFFER>
            const buffer = Buffer.from(arrayBuffer)

            // PROCESS BUFFER
            const processedBuffer = await sharp(buffer).resize(300, 300, { fit: 'inside' }).toBuffer()
                
            // GET METADA PROCESSED BUFFER
            const metadata = await sharp(processedBuffer).metadata()
    
            // GET LEFT SIDE AS BUFFER
            const leftSideBuffer = await sharp(processedBuffer)
                .extract({
                    left: 0,
                    top: 0,
                    width: metadata.width ?? 100,
                    height: metadata.height ?? 100
                })
                .toBuffer()
                
            
            // ANALYZE COLOR PALATTE OF LEFT SIDE BUFFER
            const leftSidePalette = await Vibrant.from(leftSideBuffer).getPalette()
    
            // GET COLOR
            const leftSideColor = leftSidePalette.Vibrant!.hex
    
            return leftSideColor
            
        } catch (error) {

            this.logger.error(`ImageProcessingService: Error extracting left side color - ${(error as Error).message}`);
            
            // DEFAULT COLOR ON ERROR
            return "#000000"
        }
    }
}