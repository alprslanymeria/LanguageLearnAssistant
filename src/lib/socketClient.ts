"use client"
import { io } from "socket.io-client"

const hostname = process.env.HOSTNAME || "0.0.0.0"
const port = parseInt(process.env.PORT || "3000", 10)

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || `http://${hostname}:${port}`

const socket = (globalThis as any).socket || io(URL, { autoConnect: true , closeOnBeforeunload : true})
;(globalThis as any).socket = socket

export default socket