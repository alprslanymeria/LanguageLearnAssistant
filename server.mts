import {createServer} from "node:http"
import next from "next"
import {Server} from "socket.io"
// TYPES
import type { CreateLiveSessionProps, DeleteLiveSessionProps } from "./src/types/actions.d.ts"
// ZOD
import { CreateLiveSessionSchema, DeleteLiveSessionSchema } from "./src/zod/actionsSchema.ts"
//LIBRARIES
import { prisma } from "./src/lib/prisma.ts"
// UTILS
import { createResponse } from "./src/utils/response.ts"


//GET HOSTNAME AND PORT
const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.HOSTNAME || "localhost"
const port = parseInt(process.env.PORT || "3000", 10)

const app = next({dev, hostname, port})
const handle = app.getRequestHandler()


app.prepare().then(() => {

    const httpServer = createServer(handle)
    const io = new Server(httpServer)


    io.on("connection", (socket) => {

        console.log(`USER CONNECTED: ${socket.id}`)

        // TODO: VERİTABANINDA LIVE SESSION OLUŞTURULUR
        socket.on("create-live-session", async (params : CreateLiveSessionProps, callback) => {

            try {

                await CreateLiveSessionSchema.parseAsync(params)

                const {userId, liveSessionId} = params

                // CONNECT USERID TO SOCKET
                socket.data.userId = userId

                const isLiveSessionExist = await prisma.liveSession.findUnique({
                
                    where: {
                        userId: userId
                    }
                })

                if(isLiveSessionExist) {

                    throw new Error("Live Session already exist!")
                }

                const liveSession = await prisma.liveSession.create({

                    data: {
                        userId: userId!,
                        liveSessionId: liveSessionId
                    }
                })

                console.log(`SESSION CREATED FOR ${userId}`)

                callback(createResponse(true, 201, {data: liveSession}, "Live Session Created Successfully!"))
                
            } catch (error) {

                if(error instanceof Error)
                callback(createResponse(false, 500, null, error.message))

                callback(createResponse(false, 500, null, "ERROR: CreateLiveSession!"))
            }
        })


        socket.on("delete-live-session", async (params: DeleteLiveSessionProps, callback) => {

            try {

                await DeleteLiveSessionSchema.parseAsync(params)
            
                const {userId} = params

                const isLiveSessionExist = await prisma.liveSession.findUnique({
                
                    where: {
                        userId: userId
                    }
                })
        
                if(!isLiveSessionExist) {
        
                    throw new Error("Live Session doesn't exist!")
                }
                
                await prisma.liveSession.delete({
                    where: {
                        userId: userId
                    }
                })

                console.log(`SESSION DELETED FOR ${userId}`)

                callback(createResponse(true, 204, undefined , "Live session deleted successfully!"))
                
            } catch (error) {
                
                console.log(`ERROR: DeleteLiveSession: ${error}`)
                
                if(error instanceof Error)
                callback(createResponse(false, 500, undefined , error.message))
        
                callback(createResponse(false, 500, undefined , "ERROR: DeleteLiveSession"))
            }
        })



        // TEK BIR CLIENT (SOCKET) BAĞLANTISI İÇİN GEÇERLİDİR.
        socket.on("disconnect", async (reason) => {

            console.log(`USER DISCONNECTED: ${socket.id}`)
            console.log(`REASON: ${reason}`)

            if (socket.data.userId && reason) {

                try {

                    await prisma.liveSession.delete({

                        where: { userId: socket.data.userId }
                    })

                    console.log(`SESSION DELETED FOR ${socket.data.userId}`)

                } catch (err) {

                    console.error("Delete on disconnect failed:", err)
                }
            }
        })
    })


    httpServer.listen(port, () => {

        console.log(`SERVER RUNNING: http://${hostname}:${port}`)
    })
})