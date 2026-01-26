// IMPORTS
import { User } from "@/src/generated/prisma/client"

export interface UpdateUserData {

    name?: string
    nativeLanguageId?: number
    image?: string
}

export interface IUserRepository {

    // HELPER
    isUserExist(id: string): Promise<boolean>

    // CRUD
    createAsync(user: User): Promise<void>
    getByIdAsync(id: string): Promise<User | null>
    update(id: string, data: UpdateUserData): Promise<string>
    delete(user: User): void
}