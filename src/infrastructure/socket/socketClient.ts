"use client"

import { io } from "socket.io-client"

const SERVER = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL

const URL = SERVER

const socket = (globalThis as any).socket || io(URL, { autoConnect: true })
;(globalThis as any).socket = socket

export default socket