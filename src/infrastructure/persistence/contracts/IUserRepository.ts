// IMPORTS
import { Prisma, User } from "@prisma/client"

export interface IUserRepository {

    // CRUD
    createAsync(user: User): Promise<void>
    getByIdAsync(id: string): Promise<User | null>
    updateAsync(id: string, data: Prisma.UserUpdateInput): Promise<void>
    deleteAsync(user: User): Promise<void>

    // HELPER
    isUserExist(id: string): Promise<boolean>
    findByEmail(email: string): Promise<User | null>
}