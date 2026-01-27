// IMPORTS
import { inject, injectable } from "inversify"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { CompareLanguageIdQuery } from "./Query"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { TYPES } from "@/src/di/type"
import { UserNotFound } from "@/src/exceptions/NotFound"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"

@injectable()
export class CompareLanguageIdQueryHandler implements IQueryHandler<CompareLanguageIdQuery, boolean> {

    // FIELDS
    private readonly logger : ILogger
    private readonly userRepository: IUserRepository
    private readonly languageRepository: ILanguageRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.UserRepository) userRepository: IUserRepository,
        @inject(TYPES.LanguageRepository) languageRepository: ILanguageRepository

    ) {
        
        this.logger = logger
        this.userRepository = userRepository
        this.languageRepository = languageRepository
    }

    async Handle(request: CompareLanguageIdQuery): Promise<boolean> {
        
        // GET USER
        const user = await this.userRepository.getByIdAsync(request.request.userId)

        if (!user) {

            this.logger.warn(`CompareLanguageIdQueryHandler: User with ID ${request.request.userId} not found.`)
            throw new UserNotFound()
        }

        // GET LANGUAGE ID BY NAME
        const language = await this.languageRepository.getByNameAsync(request.request.languageName)

        if(user.nativeLanguageId === language?.id) {

            this.logger.info(`CompareLanguageIdQueryHandler: User's native language ID matches the provided language ID ${language?.id}.`)
            return true
        }

        this.logger.info(`CompareLanguageIdQueryHandler: User's native language ID does not match the provided language ID ${language?.id}.`)
        return false

    }
}