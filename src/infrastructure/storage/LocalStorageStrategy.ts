// IMPORTS
import * as fs from 'fs/promises'
import * as path from 'path'
import { inject, injectable } from 'inversify'
import { IStorageStrategy } from '@/src/infrastructure/storage/IStorageStrategy'
import { StorageType } from '@/src/infrastructure/storage/Storage'
import { TYPES } from '@/src/di/type'

@injectable()
export class LocalStorageStrategy implements IStorageStrategy {

    // FIELDS
    type: StorageType = 'local'
    
    // CTOR
    constructor(
        
        @inject(TYPES.LocalStorageBasePath)
        private readonly basePath: string
    
    ) {
        this.ensureBaseDirectory()
    }

    // UTILS
    private async ensureBaseDirectory(): Promise<void> {

        try {
            await fs.access(this.basePath)
        } catch {
            await fs.mkdir(this.basePath, { recursive: true })
        }
    }

    private getFullPath(filePath: string): string {

        return path.join(this.basePath, filePath)
    }

    private async ensureDirectoryExists(filePath: string): Promise<void> {

        const directory = path.dirname(filePath)

        try {
            await fs.access(directory)
        } catch {
            await fs.mkdir(directory, { recursive: true })
        }
    }

    private async listFilesRecursively(directory: string): Promise<string[]> {

        const entries = await fs.readdir(directory, { withFileTypes: true })
        
        const files: string[] = []

        for (const entry of entries) {

            const fullPath = path.join(directory, entry.name)

            if (entry.isDirectory()) {

                const nestedFiles = await this.listFilesRecursively(fullPath)
                files.push(...nestedFiles)

            } else {
                
                files.push(fullPath)
            }
        }

        return files
    }

    // INTERFACE IMPLEMENTATION
    async upload(filePath: string, data: Buffer, contentType?: string): Promise<string> {

        const fullPath = this.getFullPath(filePath)

        await this.ensureDirectoryExists(fullPath)
        await fs.writeFile(fullPath, data)

        return filePath
    }

    async download(filePath: string): Promise<Buffer> {

        const fullPath = this.getFullPath(filePath)

        return await fs.readFile(fullPath)
    }

    async delete(filePath: string): Promise<void> {

        const fullPath = this.getFullPath(filePath)

        await fs.rm(fullPath, { force: true })
    }

    async deleteByPrefix(prefix: string): Promise<void> {

        const files = await this.list(prefix)

        await Promise.all(files.map(file => this.delete(file)))
    }

    async exists(filePath: string): Promise<boolean> {

        const fullPath = this.getFullPath(filePath)

        try {
            await fs.access(fullPath)
            return true
        } catch {
            return false
        }
    }

    async getUrl(filePath: string): Promise<string> {

        const fullPath = this.getFullPath(filePath)

        return `file://${path.resolve(fullPath)}`
    }

    async list(prefix?: string): Promise<string[]> {

        const searchPath = prefix 
            ? this.getFullPath(prefix) 
            : this.basePath

        try {
            const files = await this.listFilesRecursively(searchPath)

            return files.map(file => path.relative(this.basePath, file).replace(/\\/g, '/'))

        } catch {

            return []
        }
    }
}
