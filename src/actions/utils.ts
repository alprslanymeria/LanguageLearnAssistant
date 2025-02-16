"use server"

// LIBRARIES
import { prisma } from "../lib/prisma"

export default async function GetCreateItems(language: string | null, practice: string | null, userId: string | null | undefined){

    try {
        
        // GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                name: language
            }
        })

        // GET PRACTICE ID
        const prac = await prisma.practice.findFirst({
            where: {
                languageId: lang.id,
                name: practice
            }
        })

        let user;
        let practiceForDefault;
        let originalWriting : any

        if(practice == "writing"){

            // GET DEFAULT LANGUAGE ID
            user = await prisma.user.findFirst({
                where: {
                    userId: userId
                }
            })

            // GET PRACTICE ID
            practiceForDefault = await prisma.practice.findFirst({
                where: {
                    languageId: user.defaultLanguageId,
                    name: practice
                }
            })

            //GET ORIGINAL WRITING
            originalWriting = await prisma.writing.findFirst({

                where: {
                    userId: userId,
                    practiceId: prac.id,
                    languageId: lang.id
                }
            })

            if(!originalWriting){

                originalWriting = await prisma.writing.create({
                    data: {
                        userId: userId,
                        practiceId: prac.id,
                        languageId: lang.id
                    }
                })
            }

        }
        

        let CreateItems = null

        switch (practice) {
            case "flashcard":
                CreateItems = await prisma.flashcardCategory.findMany({
                    where: {
                        flashcard: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    include : {
                        deckWords: true
                    }
                })
                break;
            case "reading":
                CreateItems = await prisma.readingBook.findMany({
                    where: {
                        reading: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    include: {
                        reading : true
                    }
                })
                break;
            case "writing":
                CreateItems = await prisma.writingBook.findMany({
                    where: {
                        writing: {
                            userId: userId,
                            practiceId: practiceForDefault.id,
                            languageId: user.defaultLanguageId
                        }
                    },
                    include : {
                        writing : true
                    }
                })

                CreateItems.map((item: any) => {

                    item.writingId = originalWriting.id
                    
                })
                break;
            case "listening":
                CreateItems = await prisma.listeningFilm.findMany({
                    where: {
                        listening: {
                            userId: userId,
                            practiceId: prac.id,
                            languageId: lang.id
                        }
                    },
                    include : {
                        listening : true
                    }
                })
                break;
        }


        return {data: CreateItems, status: 200};

    } catch (error) {
        
        if(error instanceof Error) return {status: 500, message: "Create Items verileri alınırken bir hata oluştu", details: error.message};
        
    }
}