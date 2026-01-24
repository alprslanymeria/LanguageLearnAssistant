// IMPORTS
import { User } from "@/src/generated/prisma/client"

export interface IUserRepository {

    // HELPER
    isUserExist(id: string): Promise<boolean>

    // CRUD
    createAsync(user: User): Promise<void>
    getByIdAsync(id: string): Promise<User | null>
    update(user: User): User
    delete(user: User): void
}