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

                if(!readingBookItem) return createResponse<GetItemByIdResponse>(false, 404 , null , "Reading Book Item Not Found!")

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

                if(!writingBookItem) return createResponse<GetItemByIdResponse>(false, 404 , null , "Writing Book Item Not Found!")

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

                if(!flashcardCategoryItem) return createResponse<GetItemByIdResponse>(false, 404 , null , "Flashcard Category Item Not Found!")

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

                if(!flashcardWordsItem) return createResponse<GetItemByIdResponse>(false, 404 , null , "Flashcard Words Item Not Found!")

                return createResponse(true, 200, {data: flashcardWordsItem as DWWCL }  , "SUCCESS GetItemById")

            default: 
                return createResponse<GetItemByIdResponse>(false, 500, null, "ERROR: GetItemById")
        }

    } catch (error) {
        
        console.log(`ERROR: GetItemById: ${error}`)
        return createResponse<GetItemByIdResponse>(false, 500, null, "ERROR: GetItemById")
    }
}


export async function DeleteById(params : DeleteByIdProps) : Promise<ApiResponse<void>> {

    try {

        await DeleteyIdSchema.parseAsync(params)

        const {itemId, table} = params
        
        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID

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

                if(!rbook) return createResponse(false, 404, null, "Reading Book Not Found!")

                // DELETE FROM DATABASE
                await prisma.readingBook.delete({
                    where: {
                        id: itemId!
                    }
                })

                // DELETE FROM CLOUD
                const rbookFileName =  decodeURIComponent(rbook!.imageUrl.split('/').pop() ?? "")
                const rbookSourceName = decodeURIComponent(rbook!.sourceUrl.split('/').pop() ?? "") 
                await bucket.file(rbookFileName).delete()
                await bucket.file(rbookSourceName).delete()

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

                if(!wbook) return createResponse(false, 404, null, "Wriitng Book Not Found!")

                // DELETE FROM DATABASE
                await prisma.writingBook.delete({
                    where: {
                        id: itemId!
                    }
                })
                
                // DELETE FROM CLOUD
                const wbookFileName = decodeURIComponent(wbook!.imageUrl.split('/').pop() ?? "") 
                const wbookSourceName = decodeURIComponent(wbook!.sourceUrl.split('/').pop() ?? "") 
                await bucket.file(wbookFileName).delete()
                await bucket.file(wbookSourceName).delete()

                return createResponse(true, 204, null, "Delete successfull!")

            case "fcategories":

                const fcategory = await prisma.flashcardCategory.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!fcategory) return createResponse(false, 404, null, "Flashcard Category Not Found!")

                // DELETE FROM DATABASE
                await prisma.flashcardCategory.delete({
                    where: {
                        id: itemId!
                    }
                })

                return createResponse(true, 204, null, "Delete successfull!")

            case "fwords":

                const dword = await prisma.deckWord.findUnique({
                    where: {
                        id: itemId!
                    }
                })

                if(!dword) return createResponse(false, 404, null, "Deck Word Not Found!")

                // DELETE FROM DATABASE
                await prisma.deckWord.delete({
                    where: {
                        id: itemId!
                    }
                })

                return createResponse(true, 204, null, "Delete successfull!")

            default:
                return createResponse(false, 500, null, "ERROR: DeleteById!")

        }

    } catch (error) {

        console.log(`ERROR: DeleteById: ${error}`)
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
    }
}

async function GetExistingRecord({table, itemId} : GetExistingRecordProps) {

    switch(table) {
        case "rbooks":
            const readingBook = await prisma.readingBook.findUnique({
                where: {
                    id: itemId!
                }
            })

            return readingBook

        case "wbooks":
            const writingBook = await prisma.writingBook.findUnique({
                where: {
                    id: itemId!
                }
            })

            return writingBook

        default: 
            throw new Error(`Unknown table: ${table}`)

            
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

    await ReadingAddOrUpdateSchema.parseAsync(values)


    try {

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({
            
            projectId: projectId
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


            // UPLOAD FILES TO GOOGLE CLOUD STORAGE
            const file1Upload = bucket.file(file1Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileOne).type }
            })

            const file2Upload = bucket.file(file2Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileTwo).type }
            })

            // WRITE FILES TO GOOGLE CLOUD STORAGE
            file1Upload.end(Buffer.from(bufferForFileOne))
            file2Upload.end(Buffer.from(bufferForFileTwo))


            // GET FILE'S URL
            const fileOneUrl = bucket.file(file1Name).publicUrl()
            const fileTwoUrl = bucket.file(file2Name).publicUrl()


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
                        imageUrl: fileOneUrl,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl
                    }
                })

                return createResponse(true, 200, readingBook, "Reading book created successfully!")
            })

        }


        const handleEdit = async () => {


            // GET OLD FILE INFO'S
            const existingRecord = await GetExistingRecord({table: values.table!, itemId: values.itemId!})

            if(!existingRecord) throw new Error("Existing Record Not Found!")

            const oldFileOneUrl = existingRecord!.imageUrl
            const oldFileTwoUrl = existingRecord!.sourceUrl

            // DELETE OLD FILES
            if (oldFileOneUrl) {

                const oldFile1Name = decodeURIComponent(oldFileOneUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile1Name).exists()
                
                if(isExist) await bucket.file(oldFile1Name).delete()
            }

            if (oldFileTwoUrl) {

                const oldFile2Name = decodeURIComponent(oldFileTwoUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile2Name).exists()

                if(isExist) await bucket.file(oldFile2Name).delete();
            }


            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`


            // UPLOAD FILES TO GOOGLE CLOUD STORAGE
            const file1Upload = bucket.file(file1Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileOne).type }
            })

            const file2Upload = bucket.file(file2Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileTwo).type }
            })


            // WRITE FILES TO GOOGLE CLOUD STORAGE
            file1Upload.end(Buffer.from(bufferForFileOne))
            file2Upload.end(Buffer.from(bufferForFileTwo))

            // GET FILE'S URL
            const fileOneUrl = bucket.file(file1Name).publicUrl()
            const fileTwoUrl = bucket.file(file2Name).publicUrl()

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
                        imageUrl: fileOneUrl,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl
                    }
                })

                return createResponse(true, 200, readingBook, "Reading book updated successfully!")
            })
        }

        switch(values.type){

            case "Create":
                return await handleCreate()
            case "Edit":
                return await handleEdit()
            default:
                return createResponse<ReadingBook>(false, 500, null, "ERROR: ReadingAddOrEdit")
        }
        
    } catch (error) {
        
        console.log(`ERROR: ReadingAddOrEdit: ${error}`)
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

    await WritingAddOrUpdateSchema.parseAsync(values)


    try {

        // GOOGLE STORAGE CONFIGURATION
        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({
            
            projectId: projectId
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


            // UPLOAD FILES TO GOOGLE CLOUD STORAGE
            const file1Upload = bucket.file(file1Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileOne).type }
            })

            const file2Upload = bucket.file(file2Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileTwo).type }
            })

            // WRITE FILES TO GOOGLE CLOUD STORAGE
            file1Upload.end(Buffer.from(bufferForFileOne))
            file2Upload.end(Buffer.from(bufferForFileTwo))


            // GET FILE'S URL
            const fileOneUrl = bucket.file(file1Name).publicUrl()
            const fileTwoUrl = bucket.file(file2Name).publicUrl()


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
                        imageUrl: fileOneUrl,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl
                    }
                })

                return createResponse(true, 200, writingBook, "Writing book created successfully!")
            })


        }


        const handleEdit = async () => {

            // GET OLD FILE INFO'S
            const existingRecord = await GetExistingRecord({table: values.table!, itemId: values.itemId})

            if(!existingRecord) throw new Error("Existing Record Not Found!")

            const oldFileOneUrl = existingRecord!.imageUrl
            const oldFileTwoUrl = existingRecord!.sourceUrl

            // DELETE OLD FILES
            if (oldFileOneUrl) {

                const oldFile1Name = decodeURIComponent(oldFileOneUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile1Name).exists()
                
                if(isExist) await bucket.file(oldFile1Name).delete()
            }

            if (oldFileTwoUrl) {

                const oldFile2Name = decodeURIComponent(oldFileTwoUrl.split('/').pop() ?? "") 
                const [isExist] = await bucket.file(oldFile2Name).exists()

                if(isExist) await bucket.file(oldFile2Name).delete();
            }


            // CREATE UNIQUE NAME FOR FILES
            const file1Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileOne).name}`
            const file2Name = `${values.userId}/${values.table}/${Date.now()}_${(values.fileTwo).name}`


            // UPLOAD FILES TO GOOGLE CLOUD STORAGE
            const file1Upload = bucket.file(file1Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileOne).type }
            })

            const file2Upload = bucket.file(file2Name).createWriteStream({
                resumable: false,
                metadata: { contentType: (values.fileTwo).type }
            })


            // WRITE FILES TO GOOGLE CLOUD STORAGE
            file1Upload.end(Buffer.from(bufferForFileOne))
            file2Upload.end(Buffer.from(bufferForFileTwo))

            // GET FILE'S URL
            const fileOneUrl = bucket.file(file1Name).publicUrl()
            const fileTwoUrl = bucket.file(file2Name).publicUrl()

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
                        imageUrl: fileOneUrl,
                        leftColor: leftSideColor!,
                        sourceUrl: fileTwoUrl
                    }
                })

                return createResponse(true, 200, writingBook, "Writing book updated successfully!")
            })

        }


        switch(values.type){

            case "Create":
                return await handleCreate()
            case "Edit":
                return handleEdit()
            default:
                return createResponse<WritingBook>(false, 500, null, "ERROR: WritingAddOrEdit")
        }
        
        
    } catch (error) {
        
        console.log(`ERROR: WritingAddOrEdit: ${error}`)
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

                return createResponse(true, 200, deckWord, "Deck word updated successfully!")
            })
        }


        switch(values.type){

            case "Create":
                return await handleCreate()
            case "Edit":
                return await handleEdit()
            default:
                return createResponse<DeckWord>(false, 500, null, "ERROR: DeckWordAddOrEdit")
        }
        
    } catch (error) {
        
        console.log(`ERROR: DeckWordAddOrEdit: ${error}`)
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

                return createResponse(true, 200, flashcardCategory, "Flashcard category updated successfully!")
            })
        }


        switch(values.type){

            case "Create":
                return await handleCreate()
            case "Edit":
                return await handleEdit()
            default:
                return createResponse<FlashcardCategory>(false, 500, null, "ERROR: FlashcardCategoryAddOrEdit")
        }

    } catch (error) {

        console.log(`ERROR: FlashcardCategoryAddOrEdit: ${error}`)
        return createResponse<FlashcardCategory>(false, 500, null, "ERROR: FlashcardCategoryAddOrEdit")        
    }
}