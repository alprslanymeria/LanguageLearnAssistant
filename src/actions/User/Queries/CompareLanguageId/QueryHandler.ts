// IMPORTS
import { inject, injectable } from "inversify"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { CompareLanguageIdQuery } from "./Query"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { TYPES } from "@/src/di/type"
import { UserNotFound } from "@/src/exceptions/NotFound"
import type { ILanguageRepository } from "@/src/infrastructure/persistence/contracts/ILanguageRepository"
import { LanguageMapper } from "../../LanguageEnum"

@injectable()
export class CompareLanguageIdQueryHandler implements IQueryHandler<CompareLanguageIdQuery, boolean> {

    // FIELDS
    private readonly logger : ILogger
    private readonly userRepository: IUserRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.UserRepository) userRepository: IUserRepository,

    ) {
        
        this.logger = logger
        this.userRepository = userRepository
    }

    async Handle(request: CompareLanguageIdQuery): Promise<boolean> {
        
        // GET USER
        const user = await this.userRepository.getByIdAsync(request.request.userId)

        if (!user) {

            this.logger.warn(`CompareLanguageIdQueryHandler: User with ID ${request.request.userId} not found.`)
            throw new UserNotFound()
        }

        // GET LANGUAGE ID BY NAME
        const languageId = LanguageMapper.fromName(request.request.languageName)

        if(user.nativeLanguageId === languageId) {

            this.logger.info(`CompareLanguageIdQueryHandler: User's native language ID matches the provided language ID ${languageId}.`)
            return true
        }

        this.logger.info(`CompareLanguageIdQueryHandler: User's native language ID does not match the provided language ID ${languageId}.`)
        return false

    }
}