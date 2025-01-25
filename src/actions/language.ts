"use server"

// LIBRARIES
import {prisma} from "@/src/lib/prisma";

export async function GetLanguages() {

    try {

        const languages = await prisma.language.findMany();

        return {data: languages, status: 200};
        
    } catch (error) {
        
        if(error instanceof Error) return {data: null, status: 500, message: "Language verileri alınırken bir hata oluştu", details: error.message};
    }
}