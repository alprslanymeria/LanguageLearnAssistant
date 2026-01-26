// IMPORTS
import { inject, injectable } from "inversify"
import { IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { GetProfileInfosQuery } from "./Query"
import { UserDto } from "@/src/actions/User/Response"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { TYPES } from "@/src/di/type"
import { UserNotFound } from "@/src/exceptions/NotFound"

@injectable()
export class GetProfileInfosQueryHandler implements IQueryHandler<GetProfileInfosQuery , UserDto> {

    // FIELDS
    private readonly logger : ILogger
    private readonly userRepository: IUserRepository

    // CTOR
    constructor(

        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.UserRepository) userRepository: IUserRepository

    ) {
        
        this.logger = logger
        this.userRepository = userRepository
    }

    async Handle(request: GetProfileInfosQuery): Promise<UserDto> {

        // GET USER
        const user = await this.userRepository.getByIdAsync(request.userId)

        if (!user) {

            this.logger.warn(`GetProfileInfosQueryHandler: User with ID ${request.userId} not found.`)
            throw new UserNotFound()
        }

        this.logger.info(`GetProfileInfosQueryHandler: Retrieved profile infos for user ID ${request.userId}.`)

        const userDto : UserDto = {

            name: user.name,
            email: user.email,
            image: user.image,
            nativeLanguageId: user.nativeLanguageId
        }

        return userDto
    }
}