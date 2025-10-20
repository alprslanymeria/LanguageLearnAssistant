"use server"

// LIBRARIES
import { prisma } from "@/src/lib/prisma"
// GOOGLE
import { Storage } from "@google-cloud/storage"
// 3RD PARTY
import { Vibrant } from "node-vibrant/node"
import sharp from "sharp"
// UTILS
import { createResponse } from "@/src/utils/response"
// TYPES
import { ApiResponse } from "@/src/types/response"
import { DeckWord, FlashcardCategory, ReadingBook, WritingBook } from "@prisma/client"
import { DeleteByIdProps, DWWCL, FCWL, GetExistingRecordProps, GetItemByIdProps, GetItemByIdResponse, GetLeftSideColorProps, RBWL, WBWL } from "@/src/types/actions"
// ZOD
import { DeckWordAddOrUpdateSchema, DeleteyIdSchema, GetItemByIdSchema, ReadingAddOrUpdateSchema, WritingAddOrUpdateSchema } from "@/src/zod/actionsSchema"
import { invalidateCacheByPrefix } from "@/src/utils/redisHelper"
import { logger } from "@/src/lib/logger"


export async function GetItemById(params : GetItemByIdProps) : Promise<ApiResponse<GetItemByIdResponse>> {

    try {

        await GetItemByIdSchema.parseAsync(params)

        const {itemId, table} = params
        
        switch(table) {

            case "rbooks":
                const readingBookItem = await prisma.readingBook.findUnique({
                    where: {
                        id: Number(itemId)
                    },
                    include: {
                        reading: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })

                if(!readingBookItem) {

                    logger.error("GetItemById: Reading Book Item Not Found! ")
                    return createResponse<GetItemByIdResponse>(false, 404 , null , "Reading Book Item Not Found!")
                } 

                logger.info("ReadingBookItem: Item başarılı bir şekilde alındı")
                return createResponse(true, 200, {data: readingBookItem as RBWL} , "SUCCESS GetItemById")

            case "wbooks":
                const writingBookItem = await prisma.writingBook.findUnique({
                    where: {
                        id: Number(itemId)
                    },
                    include: {
                        writing: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })

                if(!writingBookItem) {

                    logger.error("GetItemById: Writing Book Item Not Found! ")
                    return createResponse<GetItemByIdResponse>(false, 404 , null , "Writing Book Item Not Found!")
                } 

                logger.info("WritingBookItem: Item başarılı bir şekilde alındı")
                return createResponse(true, 200, {data: writingBookItem as WBWL} , "SUCCESS GetItemById")

            case "fcategories":
                const flashcardCategoryItem = await prisma.flashcardCategory.findUnique({
                    where: {
                        id: Number(itemId)
                    },
                    include: {
                        flashcard: {
                            select: {
                                languageId: true
                            }
                        }
                    }
                })

                if(!flashcardCategoryItem) {

                    logger.error("GetItemById: Flashcard Category Item Not Found! ")
                    return createResponse<GetItemByIdResponse>(false, 404 , null , "Flashcard Category Item Not Found!")
                } 

                logger.info("FlashcardCategoryItem: Item başarılı bir şekilde alındı")
                return createResponse(true, 200, {data: flashcardCategoryItem as FCWL} , "SUCCESS GetItemById")

            case "fwords":
                const flashcardWordsItem = await prisma.deckWord.findUnique({
                    where: {
                        id: Number(itemId)
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

                if(!flashcardWordsItem) {

                    logger.error("GetItemById: Flashcard Words Item Not Found! ")
                    return createResponse<GetItemByIdResponse>(false, 404 , null , "Flashcard Words Item Not Found!")
                } 

                logger.info("FlashcardWordsItem: Item başarılı bir şekilde alındı")
                return createResponse(true, 200, {data: flashcardWordsItem as DWWCL }  , "SUCCESS GetItemById")

            default: 
                logger.error("ERROR: GetItemById --> switch case eşleşmedi  ")
                return createResponse<GetItemByIdResponse>(false, 500, null, "ERROR: GetItemById")
        }

    } catch (error) {
        
        console.log(`ERROR: GetItemById: ${error}`)
        logger.error("ERROR: GetItemById", {error})

        return createResponse<GetItemByIdResponse>(false, 500, null, "ERROR: GetItemById")
    }
}


export async function DeleteById(params : DeleteByIdProps) : Promise<ApiResponse<void>> {

    try {

        await DeleteyIdSchema.parseAsync(params)

        const {itemId, table} = params
        
        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID
        logger.info("DELETE BY ID --> GCP_PROJECT_ID", {projectId})

        const storage = new Storage({
            
            projectId: projectId
        })

        const bucket = storage.bucket('create-items')

        switch(table){

            case "rbooks":
                const rbook = await prisma.readingBook.findUnique({
                    where: {
                        id: itemId!
                    },
                    select: {
                        imageUrl: true,
                        sourceUrl: true
                    }
                })

                if(!rbook) {

                    logger.error("DELETE BY ID: Reading Book Not Found!")
                    return createResponse(false, 404, null, "Reading Book Not Found!")
                } 

                // DELETE FROM DATABASE
                await prisma.readingBook.delete({
                    where: {
                        id: itemId!
                    }
                })

                logger.info("DELETE BY ID: Reading Book Deleted From Database!")

                // DELETE FROM CLOUD
                const rbookFileName =  decodeURIComponent(rbook!.imageUrl.split('/').pop() ?? "")
                const rbookSourceName = decodeURIComponent(rbook!.sourceUrl.split('/').pop() ?? "") 
                await bucket.file(rbookFileName).delete()
                await bucket.file(rbookSourceName).delete()

                logger.info("DELETE BY ID: Reading Book Deleted From Cloud!")
                return createResponse(true, 204, null, "Delete successfull!")
                
            case "wbooks":
                const wbook = await prisma.writingBook.findUnique({
                    where: {
                        id: itemId!
                    },
                    select: {
                        imageUrl: true,
                        sourceUrl: true
                    }
                })

                if(!wbook) {

                    logger.error("DELETE BY ID: Writing Book Not Found!")
                    return createResponse(false, 404, null, "Wriitng Book Not Found!")
                }

                // DELETE FROM DATABASE
                await prisma.writingBook.delete({
                    where: {
                        id: itemId!
                    }
                })

                logger.info("DELETE BY ID: Writing Book Deleted From Database!")
                
                // DELETE FROM CLOUD
                const wbookFileName = decodeURIComponent(wbook!.imageUrl.split('/').pop() ?? "") 
                const wbookSourceName = decodeURIComponent(wbook!.sourceUrl.split('/').pop() ?? "") 
                await bucket.file(wbookFileName).delete()
                await bucket.file(wbookSourceName).delete()

                logger.info("DELETE BY ID: Writing Book Deleted From Cloud!")
                return createResponse(true, 204, null, "Delete successfull!")

            case "fcategories":

                const fcategory = await prisma.flashcardCategory.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!fcategory) {

                    logger.error("DELETE BY ID: Flashcard Category Not Found!")
                    return createResponse(false, 404, null, "Flashcard Category Not Found!")
                } 

                // DELETE FROM DATABASE
                await prisma.flashcardCategory.delete({
                    where: {
                        id: itemId!
                    }
                })

                logger.info("DELETE BY ID: Flashcard Category Deleted From Database!")
                return createResponse(true, 204, null, "Delete successfull!")

            case "fwords":

                const dword = await prisma.deckWord.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!dword) {

                    logger.error("DELETE BY ID: Deck Word Not Found!")
                    return createResponse(false, 404, null, "Deck Word Not Found!")
                } 

                // DELETE FROM DATABASE
                await prisma.deckWord.delete({
                    where: {
                        id: itemId!
                    }
                })

                logger.info("DELETE BY ID: Deck Word Deleted From Database!")
                return createResponse(true, 204, null, "Delete successfull!")

            default:
                logger.error("ERROR: DeleteById --> switch case eşleşmedi!")
                return createResponse(false, 500, null, "ERROR: DeleteById!")

        }

    } catch (error) {

        console.log(`ERROR: DeleteById: ${error}`)
        logger.error("ERROR: DeleteById", {error})

        return createResponse(false, 500, null, "ERROR: DeleteById!")
    }
}


// GET LEFT SIDE COLOR FOR IMAGE
async function GetLeftSideColor({bufferForFile} : GetLeftSideColorProps) {

    try {
        
        // ARRAY BUFFER --> BUFFER<ARRAY BUFFER>
        const buffer = Buffer.from(bufferForFile);
        
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
        
        // TODO: HATA DÖNÜLECEK
        logger.error("ERROR: GetLeftSideColor", {error})
    }
}

async function GetExistingRecord({table, itemId} : GetExistingRecordProps) {

    try {

        switch(table) {
            case "rbooks":
                const readingBook = await prisma.readingBook.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!readingBook) {

                    logger.error("GetExistingRecord: Reading Book Not Found!")
                    return null
                }

                logger.info("GetExistingRecord: Reading Book is Exist", {readingBook})
                return readingBook

            case "wbooks":
                const writingBook = await prisma.writingBook.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!writingBook) {

                    logger.error("GetExistingRecord: Writing Book Not Found!")
                    return null
                }

                logger.info("GetExistingRecord: Writing Book is Exist", {writingBook})
                return writingBook

            default:
                logger.error("ERROR: GetExistingRecord: switch case eşleşmedi!")
                throw new Error(`Unknown table: ${table}`)
        }
        
    } catch (error) {

        logger.error("ERROR: GetExistingRecord", {error})
        
    }

}

export async function ReadingAddOrUpdate(prevState : ApiResponse<ReadingBook> | undefined, formData: FormData) : Promise<ApiResponse<ReadingBook>>  {

    // GET FORM DATA
    const values = {

        languageId: Number(formData.get("languageId")),
        inputOne: formData.get("inputOne")?.toString(),
        fileOne: formData.get("fileOne") as File,
        fileTwo: formData.get("fileTwo") as File,

        userId: formData.get("userId")?.toString(),
        itemId: Number(formData.get("itemId")),
        table: formData.get("table")?.toString(),
        type: formData.get("type")?.toString()
    }

    logger.info("ReadingAddOrUpdate Form Verileri Alındı:", {values} )
    await ReadingAddOrUpdateSchema.parseAsync(values)


    try {

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID
        logger.info("READING ADD OR UPDATE --> GCP_PROJECT_ID", {projectId})

        const storage = new Storage({
            
            projectId: projectId,
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })

        const bucket = storage.bucket('create-items')

        // GET BUFFERS OF FILES
        const bufferForFileOne = await (values.fileOne).arrayBuffer()
        const bufferForFileTwo = await (values.fileTwo).arrayBuffer()

        // GET LEFT SIDE COLOR READING BOOK IMAGE
        const leftSideColor = await GetLeftSideColor({bufferForFile: bufferForFileOne})


        const handleCreate = async () => {

            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`

            logger.info("READING BOOK ADD: FILE 1 NAME", {file1Name})
            logger.info("READING BOOK ADD: FILE 2 NAME", {file2Name})

            const [fileOneUrl, fileTwoUrl] = await Promise.all([

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file1Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileOne.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("READING BOOK ADD --> GCS FILE 1 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {
        
                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("READING BOOK ADD --> STREAM FILE 1 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileOne))

                }),

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file2Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileTwo.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("READING BOOK ADD --> GCS FILE 2 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {
        
                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("READING BOOK ADD --> STREAM FILE 2 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileTwo))
                })
            ])

            logger.info("READING BOOK ADD --> READING BOOK FILE 1 CLOUD URL", {fileOneUrl})
            logger.info("READING BOOK ADD --> READING BOOK FILE 2 CLOUD URL", {fileTwoUrl})
            logger.info("READING BOOK ADD --> READING BOOK FILES SUCCESSFULLY UPLOADED TO CLOUD")


            // SAVE TO DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "reading" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const reading = await tx.reading.upsert({
                    where: { userId_languageId_practiceId: { userId: values.userId!, languageId: values.languageId, practiceId: practice!.id } },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId,
                        practiceId: practice!.id
                    }
                })

                const readingBook = await tx.readingBook.create({
                    data: {
                        readingId: reading.id,
                        name: values.inputOne!,
                        imageUrl: fileOneUrl as string,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl as string
                    }
                })

                logger.info("READING BOOK FILES SUCCESSFULLY ADDED TO DATABASE")
                return createResponse(true, 200, readingBook, "Reading book created successfully!")
            })

        }


        const handleEdit = async () => {


            // GET OLD FILE INFO'S
            const existingRecord = await GetExistingRecord({table: values.table!, itemId: values.itemId!})

            if(!existingRecord) throw new Error("READING BOOK UPDATE: Existing Record Not Found!")

            const oldFileOneUrl = existingRecord!.imageUrl
            const oldFileTwoUrl = existingRecord!.sourceUrl

            // DELETE OLD FILES
            if (oldFileOneUrl) {

                const oldFile1Name = decodeURIComponent(oldFileOneUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile1Name).exists()
                
                if(isExist) await bucket.file(oldFile1Name).delete()

                logger.info("READING BOOK UPDATE: FILE ONE DELETED FROM CLOUD")
            }

            if (oldFileTwoUrl) {

                const oldFile2Name = decodeURIComponent(oldFileTwoUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile2Name).exists()

                if(isExist) await bucket.file(oldFile2Name).delete()

                logger.info("READING BOOK UPDATE: FILE TWO DELETED FROM CLOUD")
            }


            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`

            logger.info("READING BOOK UPDATE: FILE 1 NAME", {file1Name})
            logger.info("READING BOOK UPDATE: FILE 2 NAME", {file2Name})

            const [fileOneUrl, fileTwoUrl] = await Promise.all([

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file1Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileOne.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("READING BOOK UPDATE --> GCS FILE 1 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {
        
                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("READING BOOK UPDATE --> STREAM FILE 1 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileOne))

                }),

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file2Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileTwo.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("READING BOOK UPDATE --> GCS FILE 2 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {
        
                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("READING BOOK UPDATE --> STREAM FILE 2 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileTwo))
                })
            ])

            logger.info("READING BOOK UPDATE --> READING BOOK FILE 1 CLOUD URL", {fileOneUrl})
            logger.info("READING BOOK UPDATE --> READING BOOK FILE 2 CLOUD URL", {fileTwoUrl})
            logger.info("READING BOOK UPDATE --> READING BOOK FILES SUCCESSFULLY UPLOADED TO CLOUD")

            // UPDATE DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "reading" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const reading = await tx.reading.upsert({
                    where: { 
                        userId_languageId_practiceId: { 
                            userId: values.userId!, 
                            languageId: values.languageId, 
                            practiceId: practice!.id 
                        } 
                    },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId!,
                        practiceId: practice!.id
                    }
                })

                const existingReadingBook = await tx.readingBook.findUnique({
                    where: {
                        id: values.itemId
                    }
                })

                if(!existingReadingBook) throw new Error("Reading Book Not Found!")

                const readingBook = await tx.readingBook.update({
                    where: { id: values.itemId },
                    data: {
                        readingId: reading.id,
                        name: values.inputOne,
                        imageUrl: fileOneUrl as string,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl as string
                    }
                })

                logger.info("READING BOOK FILES UPDATED SUCCESSFULLY ON DATABASE")
                return createResponse(true, 200, readingBook, "Reading book updated successfully!")
            })
        }

        let result: ApiResponse<ReadingBook>

        switch(values.type){

            case "Create":
                result = await handleCreate()
                break
            case "Edit":
                result = await handleEdit()
                break
            default:
                return createResponse<ReadingBook>(false, 500, null, "ERROR: ReadingAddOrEdit")
        }

        await invalidateCacheByPrefix(`get_all_rbooks_with_paging:${values.userId}`)

        return result
        
    } catch (error) {
        
        console.log(`ERROR: ReadingAddOrEdit: ${error}`)
        logger.error("ERROR: ReadingAddOrUpdate", {error})

        return createResponse<ReadingBook>(false, 500, null, "ERROR: ReadingAddOrEdit")
    }
}

export async function WritingAddOrUpdate(prevState : ApiResponse<WritingBook> | undefined, formData: FormData) : Promise<ApiResponse<WritingBook>> {

    // GET FORM DATA
    const values = {

        languageId: Number(formData.get("languageId")),
        inputOne: formData.get("inputOne")?.toString(),
        fileOne: formData.get("fileOne") as File,
        fileTwo: formData.get("fileTwo") as File,

        userId: formData.get("userId")?.toString(),
        itemId: Number(formData.get("itemId")),
        table: formData.get("table")?.toString(),
        type: formData.get("type")?.toString()
    }

    logger.info("WritingAddOrUpdate Form Verileri Alındı:", {values} )
    await WritingAddOrUpdateSchema.parseAsync(values)


    try {

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID
        logger.info("WRITING ADD OR UPDATE --> GCP_PROJECT_ID", {projectId})

        const storage = new Storage({
            
            projectId: projectId,
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS
        })

        const bucket = storage.bucket('create-items')

        // GET BUFFERS OF FILES
        const bufferForFileOne = await (values.fileOne).arrayBuffer()
        const bufferForFileTwo = await (values.fileTwo).arrayBuffer()

        // GET LEFT SIDE COLOR READING BOOK IMAGE
        const leftSideColor = await GetLeftSideColor({bufferForFile: bufferForFileOne})


        const handleCreate = async () => {


            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`

            logger.info("WRITING BOOK ADD: FILE 1 NAME", {file1Name})
            logger.info("WRITING BOOK ADD: FILE 2 NAME", {file2Name})


            const [fileOneUrl, fileTwoUrl] = await Promise.all([

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file1Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileOne.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("WRITING BOOK ADD --> GCS FILE 1 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {
        
                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("WRITING BOOK ADD --> STREAM FILE 1 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileOne))

                }),

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file2Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileTwo.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("WRITING BOOK ADD --> GCS FILE 2 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {

                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("WRITING BOOK ADD --> STREAM FILE 2 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileTwo))
                })
            ])

            logger.info("WRITING BOOK ADD --> WRITING BOOK FILE 1 CLOUD URL", {fileOneUrl})
            logger.info("WRITING BOOK ADD --> WRITING BOOK FILE 2 CLOUD URL", {fileTwoUrl})
            logger.info("WRITING BOOK ADD --> WRITING BOOK FILES SUCCESSFULLY UPLOADED TO CLOUD")


            // SAVE TO DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "writing" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const writing = await tx.writing.upsert({
                    where: { userId_languageId_practiceId: { userId: values.userId!, languageId: values.languageId!, practiceId: practice!.id } },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId,
                        practiceId: practice!.id
                    }
                })

                const writingBook = await tx.writingBook.create({
                    data: {
                        writingId: writing.id,
                        name: values.inputOne!,
                        imageUrl: fileOneUrl as string,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl as string
                    }
                })

                logger.info("WRITING BOOK FILES SUCCESSFULLY CREATED ON DATABASE")
                return createResponse(true, 200, writingBook, "Writing book created successfully!")
            })

        }


        const handleEdit = async () => {

            // GET OLD FILE INFO'S
            const existingRecord = await GetExistingRecord({table: values.table!, itemId: values.itemId})

            if(!existingRecord) throw new Error("WRITING BOOK UPDATE: Existing Record Not Found!")

            const oldFileOneUrl = existingRecord!.imageUrl
            const oldFileTwoUrl = existingRecord!.sourceUrl

            // DELETE OLD FILES
            if (oldFileOneUrl) {

                const oldFile1Name = decodeURIComponent(oldFileOneUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile1Name).exists()
                
                if(isExist) await bucket.file(oldFile1Name).delete()

                logger.info("WRITING BOOK UPDATE: FILE ONE DELETED FROM CLOUD")
            }

            if (oldFileTwoUrl) {

                const oldFile2Name = decodeURIComponent(oldFileTwoUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile2Name).exists()

                if(isExist) await bucket.file(oldFile2Name).delete()

                logger.info("WRITING BOOK UPDATE: FILE TWO DELETED FROM CLOUD")
            }


            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`

            logger.info("WRITING BOOK UPDATE: FILE 1 NAME", {file1Name})
            logger.info("WRITING BOOK UPDATE: FILE 2 NAME", {file2Name})

            const [fileOneUrl, fileTwoUrl] = await Promise.all([

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file1Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileOne.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("WRITING BOOK UPDATE --> GCS FILE 1 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {

                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("WRITING BOOK UPDATE --> STREAM FILE 1 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileOne))

                }),

                new Promise((resolve, reject) => {

                    // CLOUD'DA BU İSİMDE BİR REFERANS OLUŞTURUYORUZ
                    const file = bucket.file(file2Name)

                    // START STREAM
                    // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                    const stream = file.createWriteStream({
                        resumable: false,
                        metadata: {contentType: values.fileTwo.type}
                    })

                    // IF ERROR OCCURED DURING STREAM
                    stream.on("error", (err) => {
        
                        logger.error("WRITING BOOK UPDATE --> GCS FILE 2 UPLOAD ERROR", {err})
                        reject(err)
                    })
        
                    // IF STREAM FINISH
                    stream.on("finish", async () => {
        
                        try {

                            resolve(file.publicUrl())
                            
                        } catch (error) {
                            
                            logger.error("WRITING BOOK UPDATE --> STREAM FILE 2 FINISH ERROR", {error})
                            reject(error)
                        }
                    })
        
                    // WRITE FILES TO GOOGLE CLOUD STORAGE
                    stream.end(Buffer.from(bufferForFileTwo))
                })
            ])

            logger.info("WRITING BOOK UPDATE --> WRITING BOOK FILE 1 CLOUD URL", {fileOneUrl})
            logger.info("WRITING BOOK UPDATE --> WRITING BOOK FILE 2 CLOUD URL", {fileTwoUrl})
            logger.info("WRITING BOOK UPDATE --> WRITING BOOK FILES SUCCESSFULLY UPLOADED TO CLOUD")

            // UPDATE DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "writing" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const writing = await tx.writing.upsert({
                    where: { 
                        userId_languageId_practiceId: { 
                            userId: values.userId!, 
                            languageId: values.languageId, 
                            practiceId: practice!.id 
                        } 
                    },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId,
                        practiceId: practice!.id
                    }
                })

                const existingWritingBook = await tx.writingBook.findUnique({
                    where: {
                        id: values.itemId
                    }
                })

                if(!existingWritingBook) throw new Error("Writing Book Not Found!")

                const writingBook = await tx.writingBook.update({
                    where: { id: values.itemId },
                    data: {
                        writingId: writing.id,
                        name: values.inputOne,
                        imageUrl: fileOneUrl as string,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl as string
                    }
                })

                logger.info("WRITING BOOK FILES UPDATED SUCCESSFULLY ON DATABASE")
                return createResponse(true, 200, writingBook, "Writing book updated successfully!")
            })

        }

        let result: ApiResponse<WritingBook>

        switch(values.type){

            case "Create":
                result = await handleCreate()
                break
            case "Edit":
                result = await handleEdit()
                break
            default:
                return createResponse<WritingBook>(false, 500, null, "ERROR: WritingAddOrEdit")
        }

        await invalidateCacheByPrefix(`get_all_wbooks_with_paging:${values.userId}`)

        return result
        
        
    } catch (error) {
        
        console.log(`ERROR: WritingAddOrEdit: ${error}`)
        logger.error("ERROR: WritingAddOrUpdate", {error})

        return createResponse<WritingBook>(false, 500, null, "ERROR: WritingAddOrEdit")
    }

}

export async function DeckWordAddOrUpdate(prevState : ApiResponse<DeckWord> | undefined, formData: FormData) : Promise<ApiResponse<DeckWord>> {

    // GET FORM DATA
    const values = {

        languageId: Number(formData.get("languageId")),
        categoryId: Number(formData.get("categoryId")),
        inputOne: formData.get("inputOne")?.toString(),
        inputTwo: formData.get("inputTwo")?.toString(),
        
        userId: formData.get("userId")?.toString(),
        itemId: Number(formData.get("itemId")),
        table: formData.get("table")?.toString(),
        type: formData.get("type")?.toString()
    }

    logger.info("DeckWordAddOrUpdate Form Verileri Alındı:", {values} )
    await DeckWordAddOrUpdateSchema.parseAsync(values)


    try {

        const handleCreate = async () => {


            // SAVE TO DATABASE

            // BURAYA KADAR GELDİYSE ZATEN CATEGORY MEVCUT OLMALIDIR. CATEGORY MEVCUT OLMASI İÇİN ZATEN FLASHCARD MEVCUT OLMALIDIR.
            return await prisma.$transaction(async (tx) => {

                const deckWord = await tx.deckWord.create({

                    data: {
                        categoryId: values.categoryId,
                        question: values.inputOne!,
                        answer: values.inputTwo!
                    }
                })

                logger.info("DeckWord CREATED ON DATABASE SUCCESSFULLY!")
                return createResponse(true, 200, deckWord, "Deck word created successfully!")
            })
            
        }


        const handleEdit = async () => {

            return await prisma.$transaction(async (tx) => {

                const existingDeckWord = await tx.deckWord.findUnique({
                    where: {
                        id: values.itemId
                    }
                })

                if(!existingDeckWord) throw new Error("DeckWord Not Found!")

                const deckWord = await tx.deckWord.update({

                    where: { id: values.itemId },
                    data: {
                        categoryId: values.categoryId,
                        question: values.inputOne,
                        answer: values.inputTwo
                    }
                })

                logger.info("DeckWord UPDATED ON DATABASE SUCCESSFULLY!")
                return createResponse(true, 200, deckWord, "Deck word updated successfully!")
            })
        }

        let result: ApiResponse<DeckWord>


        switch(values.type){

            case "Create":
                result = await handleCreate()
                break
            case "Edit":
                result = await handleEdit()
                break
            default:
                return createResponse<DeckWord>(false, 500, null, "ERROR: DeckWordAddOrEdit")
        }

        await invalidateCacheByPrefix(`get_all_fwords_with_paging:${values.userId}`)

        return result
        
    } catch (error) {
        
        console.log(`ERROR: DeckWordAddOrEdit: ${error}`)
        logger.error("ERROR: DeckWordAddOrUpdate", {error})

        return createResponse<DeckWord>(false, 500, null, "ERROR: DeckWordAddOrEdit")
    }
}

export async function FlashcardCategoryAddOrUpdate(prevState : ApiResponse<FlashcardCategory> | undefined, formData: FormData) : Promise<ApiResponse<FlashcardCategory>> {

    // GET FORM DATA
    const values = {

        languageId: Number(formData.get("languageId")),
        inputOne: formData.get("inputOne")?.toString(),
        
        userId: formData.get("userId")?.toString(),
        itemId: Number(formData.get("itemId")),
        table: formData.get("table")?.toString(),
        type: formData.get("type")?.toString()
    }

    logger.info("FlashcardCategoryAddOrUpdate Form Verileri Alındı:", {values} )
    await DeckWordAddOrUpdateSchema.parseAsync(values)

    try {

        const handleCreate = async () => {

            // SAVE TO DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "flashcard" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const flashcard = await tx.flashcard.upsert({
                    where: { userId_languageId_practiceId: { userId: values.userId!, languageId: values.languageId, practiceId: practice!.id } },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId,
                        practiceId: practice!.id
                    }
                })

                const flashcardCategory = await tx.flashcardCategory.create({
                    data: {
                        flashcardId: flashcard.id,
                        name: values.inputOne!
                    }
                })

                logger.info("FLASHCARD CATEGORY CREATED ON DATABASE SUCCESSFULLY!")
                return createResponse(true, 200, flashcardCategory, "Flashcard category created successfully!")
            })
        }


        const handleEdit = async () => {

            // UPDATE DATABASE
            return await prisma.$transaction(async (tx) => {

                const practice = await tx.practice.findUnique({
                    where: { languageId_name: { languageId: values.languageId, name: "flashcard" } },
                    select: { id: true }
                })

                if(!practice) throw new Error("Practice Not Found!")

                const flashcard = await tx.flashcard.upsert({
                    where: { userId_languageId_practiceId: { userId: values.userId!, languageId: values.languageId, practiceId: practice!.id } },
                    update: {},
                    create: {
                        userId: values.userId!,
                        languageId: values.languageId,
                        practiceId: practice!.id
                    }
                })

                const existingFlashcardCategory = await tx.flashcardCategory.findUnique({
                    where: {
                        id: values.itemId
                    }
                })

                if(!existingFlashcardCategory) throw new Error("Flashcard Category Not Found!")

                const flashcardCategory = await tx.flashcardCategory.update({
                    where: { id: values.itemId },
                    data: {
                        flashcardId: flashcard.id,
                        name: values.inputOne
                    }
                })

                logger.info("FLASHCARD CATEGORY UPDATED ON DATABASE SUCCESSFULLY!")
                return createResponse(true, 200, flashcardCategory, "Flashcard category updated successfully!")
            })
        }

        let result: ApiResponse<FlashcardCategory>

        switch(values.type){

            case "Create":
                result = await handleCreate()
                break
            case "Edit":
                result = await handleEdit()
                break
            default:
                return createResponse<FlashcardCategory>(false, 500, null, "ERROR: FlashcardCategoryAddOrEdit")
        }

        await invalidateCacheByPrefix(`get_all_fcategories_with_paging:${values.userId}`)

        return result

    } catch (error) {

        console.log(`ERROR: FlashcardCategoryAddOrEdit: ${error}`)
        logger.error("ERROR: FlashcardCategoryAddOrUpdate", {error})

        return createResponse<FlashcardCategory>(false, 500, null, "ERROR: FlashcardCategoryAddOrEdit")        
    }
}