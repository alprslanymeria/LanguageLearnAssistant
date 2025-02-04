"use server"

//LIBRARIES
import { prisma } from "../lib/prisma"
import { Storage } from "@google-cloud/storage";
import { redirect } from "next/navigation";
import { Vibrant } from "node-vibrant/node";
import sharp from "sharp";

export async function GetItemById(table : any , id: any, userId: any) {

    try {

        let item;
        let categories;
        
        switch(table) {

            case "rbooks":
                item = await prisma.readingBook.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include: {
                        reading: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })
                break;
            case "wbooks":
                item = await prisma.writingBook.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include: {
                        writing: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })
                break;
            case "lfilms":
                item = await prisma.listeningFilm.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include: {
                        listening: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })
                break;
            case "fcategories":
                item = await prisma.flashcardCategory.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include: {
                        flashcard: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })
                break;
            case "fwords":
                item = await prisma.deckWord.findUnique({
                    where: {
                        id: Number(id)
                    },
                    include : {
                        category: {
                            include : {
                                flashcard: {
                                    select: {
                                        languageId: true
                                    }
                                }
                            }
                        }
                    }
                })

                categories = await prisma.flashcardCategory.findMany({

                    where: {
                        flashcard: {
                            userId: userId
                        }
                    }
                })

                return {data: item, categories: categories, status: 200}
                break;
        }

        return {data: item, status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Item alınırken bir hata oluştu", details: error.message};
    }
}

export async function DeleteById(id : any, table : any){

    try {
        
        //Burada aynı zamanda google storage üzerinden de veri silinir.
        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({
            projectId : projectId
        })

        const imageBucket = storage.bucket("language-learn-assistant-images")

        switch(table){

            case "rbooks":
                const rbook = await prisma.readingBook.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        imageUrl: true,
                        sourceUrl: true
                    }
                })

                const rbookFileName = rbook.imageUrl.split('/').pop() ?? "";
                const rbookSourceName = rbook.sourceUrl.split('/').pop() ?? "";
                await imageBucket.file(rbookFileName).delete();
                await imageBucket.file(rbookSourceName).delete();

                await prisma.readingBook.delete({
                    where: {
                        id: id
                    }
                })
                break;
            case "wbooks":
                const wbook = await prisma.writingBook.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        imageUrl: true,
                        sourceUrl: true
                    }
                })
                
                const wbookFileName = wbook.imageUrl.split('/').pop() ?? "";
                const wbookSourceName = wbook.sourceUrl.split('/').pop() ?? "";
                await imageBucket.file(wbookFileName).delete();
                await imageBucket.file(wbookSourceName).delete();

                await prisma.writingBook.delete({
                    where: {
                        id: id
                    }
                })
                break;
            case "lfilms":
                const lfilm = await prisma.listeningFilm.findUnique({
                    where: {
                        id: id
                    },
                    select: {
                        imageUrl: true,
                        sourceUrl: true
                    }
                })

                const lfilmFileName = lfilm.imageUrl.split('/').pop() ?? "";
                const lfilmSourceName = lfilm.sourceUrl.split('/').pop() ?? "";
                await imageBucket.file(lfilmFileName).delete();
                await imageBucket.file(lfilmSourceName).delete();

                await prisma.listeningFilm.delete({
                    where: {
                        id: id
                    }
                })
                break;
            case "fcategories":
                await prisma.flashcardCategory.delete({
                    where: {
                        id: id
                    }
                })
                break;
            case "fwords":
                await prisma.deckWord.delete({
                    where: {
                        id: id
                    }
                })
                break;
        }
        
        return {status: 200}

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Öğe silinirken bir hata oluştu", details: error.message};

    }
}

export async function AddOrUpdate(prevState : any, formData: FormData){

    //GET FORM DATA'S
    const userId = formData.get("userId")
    const itemId = formData.get("itemId")
    const table = formData.get("table")
    const type = formData.get("type")

    const languageId = Number(formData.get("languageId"))
    const wordCategoryId = formData.get("wordCategoryId")
    const input1 = formData.get("input1")
    const input2 = formData.get("input2")
    const file1 = formData.get("file1")
    const file2 = formData.get("file2")

    try {

        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({
            projectId : projectId
        })

        const imageBucket = storage.bucket("language-learn-assistant-images")

        let oldFile1Url : string;
        let oldFile2Url : string;
        let bufferForFile1: ArrayBuffer;
        let bufferForFile2 : ArrayBuffer;
        let existingRecord : any;
        let file1Url: string;
        let file2Url: string;
        let leftSideColor : string;

        // GET LEFT SIDE COLOR FOR IMAGE
        const getLeftSideColor = async (bufferForFile1 : any) => {

            try {
                const buffer = Buffer.from(bufferForFile1);
                
                // First get the processed buffer and its metadata
                const processedBuffer = await sharp(buffer)
                    .resize(300, 300, { fit: 'inside' })
                    .toBuffer();
                    
                // Get the metadata to access width and height
                const metadata = await sharp(processedBuffer).metadata();

                // Now use the metadata for the extraction
                const leftSideBuffer = await sharp(processedBuffer)
                    .extract({
                        left: 0,
                        top: 0,
                        width: metadata.width ?? 100,
                        height: metadata.height ?? 100
                    })
                    .toBuffer();
                    
                // Analyze left side colors
                const leftSidePalette = await Vibrant.from(leftSideBuffer).getPalette();

                if (!leftSidePalette.Vibrant) {
                    throw new Error("Vibrant color not found in the palette");
                }

                leftSideColor = leftSidePalette.Vibrant.hex;

            } catch (error) {
                
                if(error instanceof Error) console.log(error.message);
            }
        }

        const getExistingRecord = async () => {

            switch(table) {
                case "rbooks":
                    existingRecord = await prisma.readingBook.findUnique({
                        where: {
                            id: Number(itemId)
                        }
                    })
                    break;
                case "wbooks":
                    existingRecord = await prisma.writingBook.findUnique({
                        where: {
                            id: Number(itemId)
                        }
                    })
                    break;
                case "lfilms":
                    existingRecord = await prisma.listeningFilm.findUnique({
                        where: {
                            id: Number(itemId)
                        }
                    })
                    break;
            }
        }


        if(file1 != null && file2 != null && (table == "rbooks" || table == "wbooks" || table == "lfilms"))
        {
            bufferForFile1 = await (file1 as File).arrayBuffer()
            bufferForFile2 = await (file2 as File).arrayBuffer()
            await getLeftSideColor(bufferForFile1)
        }


        const handleCreate = async () => {

            if(file1 != null && file2 != null && (table == "rbooks" || table == "wbooks" || table == "lfilms"))
            {
                // CREATE UNIQUE NAME FOR FILES
                const file1Name = `${Date.now()}_${(file1 as File).name}`;
                const file2Name = `${Date.now()}_${(file2 as File).name}`;

                // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                const file1Upload = imageBucket.file(file1Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: (file1 as File).type }
                });

                const file2Upload = imageBucket.file(file2Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: (file2 as File).type }
                });

                // WRITE FILES TO GOOGLE CLOUD STORAGE
                file1Upload.end(Buffer.from(bufferForFile1))
                file2Upload.end(Buffer.from(bufferForFile2))

                // WAIT
                await new Promise((resolve, reject) => {
                    file1Upload.on('finish', resolve);
                    file1Upload.on('error', reject);
                    file2Upload.on('finish', resolve);
                    file2Upload.on('error', reject);
                });

                // GET FILE URL'S
                file1Url = imageBucket.file(file1Name).publicUrl();
                file2Url = imageBucket.file(file2Name).publicUrl();
            }

            let practice: any;

            // SAVE TO DATABASE
            switch(table){

                case "rbooks":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "reading"
                        },
                        select: {
                            id:true
                        }
                    })
                    
                    const reading = await prisma.reading.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(reading == null)
                    {
                        await prisma.reading.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                                readingBooks: {
                                    create: {
                                        name: input1,
                                        imageUrl: file1Url,
                                        leftColor: leftSideColor,
                                        sourceUrl: file2Url
                                    }
                                }
                            }
                        })
                        break;

                    }

                    await prisma.readingBook.create({
                        data: {
                            readingId: reading.id,
                            name: input1,
                            imageUrl: file1Url,
                            leftColor: leftSideColor,
                            sourceUrl: file2Url
                        }
                    })

                    break;
                case "wbooks":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "writing"
                        },
                        select: {
                            id:true
                        }
                    })
                    
                    const writing = await prisma.writing.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(writing == null)
                    {
                        await prisma.writing.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                                writingBooks: {
                                    create: {
                                        name: input1,
                                        imageUrl: file1Url,
                                        leftColor: leftSideColor,
                                        sourceUrl: file2Url
                                    }
                                }
                            }
                        })
                        break;

                    }

                    await prisma.writingBook.create({
                        data: {
                            writingId: writing.id,
                            name: input1,
                            imageUrl: file1Url,
                            leftColor: leftSideColor,
                            sourceUrl: file2Url
                        }
                    })

                    break;
                case "lfilms":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "listening"
                        },
                        select: {
                            id:true
                        }
                    })
                    
                    const listening = await prisma.listening.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(listening == null)
                    {
                        await prisma.listening.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                                listeningFilms: {
                                    create: {
                                        name: input1,
                                        imageUrl: file1Url,
                                        sourceUrl: file2Url
                                    }
                                }
                            }
                        })
                        break;

                    }

                    await prisma.listeningFilm.create({
                        data: {
                            listeningId: listening.id,
                            name: input1,
                            imageUrl: file1Url,
                            sourceUrl: file2Url
                        }
                    })

                    break;
                case "fwords":
                    await prisma.deckWord.create({
                        data: {
                            categoryId: Number(wordCategoryId),
                            question: input1,
                            answer: input2
                        }
                    })
                    break;
                case "fcategories":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "flashcard"
                        },
                        select: {
                            id:true
                        }
                    })
                    
                    const flashcard2 = await prisma.flashcard.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(flashcard2 == null)
                    {
                        await prisma.flashcard.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                                flashcardCategories: {
                                    create: {
                                        name: input1
                                    }
                                }
                            }
                        })
                        break;

                    }

                    await prisma.flashcardCategory.create({
                        data: {
                            flashcardId: flashcard2.id,
                            name: input1
                        }
                    })

                    break;
                    
            }

        }

        const handleEdit = async () => {

            if(file1 != null && file2 != null && (table == "rbooks" || table == "wbooks" || table == "lfilms"))
            {
                // GET OLD FILE INFO'S
                await getExistingRecord();
                oldFile1Url = existingRecord.imageUrl;
                oldFile2Url = existingRecord.sourceUrl;
            }

            if(file1 != null && file2 != null && (table == "rbooks" || table == "wbooks" || table == "lfilms"))
            {
                // CREATE UNIQUE NAME FOR FILES
                const file1Name = `${Date.now()}_${(file1 as File).name}`;
                const file2Name = `${Date.now()}_${(file2 as File).name}`;

                // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                const file1Upload = imageBucket.file(file1Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: (file1 as File).type }
                });

                const file2Upload = imageBucket.file(file2Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: (file2 as File).type }
                });

                // WRITE FILES TO GOOGLE CLOUD STORAGE
                file1Upload.end(Buffer.from(bufferForFile1))
                file2Upload.end(Buffer.from(bufferForFile2))

                // WAIT
                await new Promise((resolve, reject) => {
                    file1Upload.on('finish', resolve);
                    file1Upload.on('error', reject);
                    file2Upload.on('finish', resolve);
                    file2Upload.on('error', reject);
                });

                // GET FILE URL'S
                file1Url = imageBucket.file(file1Name).publicUrl();
                file2Url = imageBucket.file(file2Name).publicUrl();

            }

            let practice;

            // UPDATE DATABASE
            switch(table){
                case "rbooks":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "reading"
                        },
                        select: {
                            id:true
                        }
                    })

                    const reading = await prisma.reading.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(reading == null){

                        const newReading = await prisma.reading.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                            }
                        })

                        await prisma.readingBook.update({
                            where: { id: Number(itemId)},
                            data: {
                                readingId: newReading.id,
                                name: input1,
                                imageUrl: file1Url,
                                leftColor: leftSideColor,
                                sourceUrl: file2Url
                            }
                        })

                        break;
                    }

                    await prisma.readingBook.update({
                        where: { id: Number(itemId)},
                        data: {
                            readingId: reading.id,
                            name: input1,
                            imageUrl: file1Url,
                            leftColor: leftSideColor,
                            sourceUrl: file2Url
                        }
                    })

                    break;
                case "wbooks":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "writing"
                        },
                        select: {
                            id:true
                        }
                    })

                    const writing = await prisma.writing.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(writing == null){

                        const newWriting = await prisma.writing.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                            }
                        })

                        await prisma.writingBook.update({
                            where: { id: Number(itemId)},
                            data: {
                                writingId: newWriting.id,
                                name: input1,
                                imageUrl: file1Url,
                                leftColor: leftSideColor,
                                sourceUrl: file2Url
                            }
                        })

                        break;
                    }

                    await prisma.writingBook.update({
                        where: { id: Number(itemId)},
                        data: {
                            writingId: writing.id,
                            name: input1,
                            imageUrl: file1Url,
                            leftColor: leftSideColor,
                            sourceUrl: file2Url
                        }
                    })
                    break;
                case "lfilms":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "listening"
                        },
                        select: {
                            id:true
                        }
                    })

                    const listening = await prisma.listening.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(listening == null){

                        const newListening = await prisma.listening.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                            }
                        })

                        await prisma.listeningFilm.update({
                            where: { id: Number(itemId)},
                            data: {
                                listeningId: newListening.id,
                                name: input1,
                                imageUrl: file1Url,
                                sourceUrl: file2Url
                            }
                        })

                        break;
                    }

                    await prisma.listeningFilm.update({
                        where: { id: Number(itemId)},
                        data: {
                            listeningId: listening.id,
                            name: input1,
                            imageUrl: file1Url,
                            sourceUrl: file2Url
                        }
                    })
                    break;
                case "fwords":
                    //languageId geliyor --> flashcard güncellenir languageId alanı değiştirilir yoksa yeni bir tane oluşturulur
                    //categoryId geliyor --> flashcardCategory güncellenir
                    //itemId geliyor
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "flashcard"
                        },
                        select: {
                            id:true
                        }
                    })

                    const flashcard1 = await prisma.flashcard.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(flashcard1 == null){

                        const newFlashcard1 = await prisma.flashcard.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                            }
                        })

                        const category = await prisma.flashcardCategory.update({
                            where: { id: Number(wordCategoryId)},
                            data: {
                                flashcardId: newFlashcard1.id,
                            }
                        })

                        await prisma.deckWord.update({
                            where: { id: Number(itemId)},
                            data: {
                                categoryId: category.id,
                                question: input1,
                                answer: input2
                            }
                        })

                    }

                    const category = await prisma.flashcardCategory.update({
                        where: { id: Number(wordCategoryId)},
                        data: {
                            flashcardId: flashcard1.id,
                        }
                    })

                    await prisma.deckWord.update({
                        where: { id: Number(itemId)},
                        data: {
                            categoryId: category.id,
                            question: input1,
                            answer: input2
                        }
                    })

                    break;
                case "fcategories":
                    practice = await prisma.practice.findFirst({
                        where: {
                            languageId: languageId,
                            name: "flashcard"
                        },
                        select: {
                            id:true
                        }
                    })

                    const flashcard2 = await prisma.flashcard.findFirst({
                        where: {
                            userId: userId,
                            languageId : languageId,
                            practiceId: practice.id
                        }
                    })

                    if(flashcard2 == null){

                        const newFlashcard2 = await prisma.flashcard.create({
                            data: {
                                userId: userId,
                                languageId : languageId,
                                practiceId: practice.id,
                            }
                        })

                        await prisma.flashcardCategory.update({
                            where: { id: Number(itemId)},
                            data: {
                                flashcardId: newFlashcard2.id,
                                name: input1,
                            }
                        })

                        break;
                    }

                    await prisma.flashcardCategory.update({
                        where: { id: Number(itemId)},
                        data: {
                            flashcardId: flashcard2.id,
                            name: input1,
                        }
                    })
                    break;
            }

            if(file1 != null && file2 != null && (table == "rbooks" || table == "wbooks" || table == "lfilms"))
            {
                // DELETE OLD FILES
                if (oldFile1Url) {
                    const oldFile1Name = oldFile1Url.split('/').pop() ?? "";
                    const isExist = await imageBucket.file(oldFile1Name).exists();
                    if(isExist)
                        await imageBucket.file(oldFile1Name).delete();
                }

                if (oldFile2Url) {
                    const oldFile2Name = oldFile2Url.split('/').pop() ?? "";
                    const isExist = await imageBucket.file(oldFile2Name).exists();
                        await imageBucket.file(oldFile2Name).delete();
                }
            }

        }

        switch(type){

            case "Create":
                await handleCreate()
                break;
            case "Edit":
                await handleEdit()
                break;
        }

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Öğe eklenirken bir hata oluştu", details: error.message, stackDetails: error.stack};
    }

    redirect(`/list/${table}`);

}