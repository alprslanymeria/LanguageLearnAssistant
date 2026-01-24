"use client"

import { io } from "socket.io-client"

const SERVER = process.env.SOCKET_SERVER_URL

const URL = SERVER

const socket = (globalThis as any).socket || io(URL, { autoConnect: true })
;(globalThis as any).socket = socket

export default socket