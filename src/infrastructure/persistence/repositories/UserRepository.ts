// IMPORTS
import { injectable } from "inversify"
import { prisma } from "@/src/infrastructure/persistence/prisma"
import { IUserRepository, UpdateUserData } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { User } from "@/src/generated/prisma/client"

@injectable()
export class UserRepository implements IUserRepository {

    async findByEmail(email: string): Promise<User | null> {
        
        return await prisma.user.findUnique({
            where: { email }
        })
    }

    async isUserExist(id: string): Promise<boolean> {
        
        const isUserExist = await prisma.user.findFirst({

            where: {
                id: id
            }
        })

        if(!isUserExist) return false

        return true
    }

    async createAsync(user: User): Promise<void> {
        
        await prisma.user.create({
            data: user
        })

    }

    async getByIdAsync(id: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user
    }

    async update(id: string, data: UpdateUserData): Promise<string> {

        const updatedUser = await prisma.user.update({

            where: {
                id: id
            },
            data: data
        })

        return updatedUser.id
    }

    async deleteAsync(user: User): Promise<void> {

        await prisma.user.delete({
            where: {
                id: user.id
            }
        })
    }
}