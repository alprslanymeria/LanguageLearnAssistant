// IMPORTS
import { DeckVideo, Prisma } from "@prisma/client"

export interface IDeckVideoRepository {

    // CRUD
    createAsync(data: Prisma.DeckVideoCreateInput): Promise<void>
    getByIdAsync(id: number): Promise<DeckVideo | null>
    updateAsync(id: number,data: Prisma.DeckVideoUpdateInput): Promise<void>
    deleteAsync(id: number): Promise<void>
}