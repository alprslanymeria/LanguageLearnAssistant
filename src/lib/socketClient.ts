"use client"
import { io } from "socket.io-client"

// const hostname = process.env.HOSTNAME || "0.0.0.0"
// const port = parseInt(process.env.PORT || "5000", 10)

const URL = `http://localhost:5000`

const socket = (globalThis as any).socket || io(URL, { autoConnect: true })
;(globalThis as any).socket = socket

export default socket