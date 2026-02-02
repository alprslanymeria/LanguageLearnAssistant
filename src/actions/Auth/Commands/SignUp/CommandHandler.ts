// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import { SignUpCommand } from "@/src/actions/Auth/Commands/SignUp/Command"
import { auth } from "@/src/infrastructure/auth/auth"
import type { IUserRepository } from "@/src/infrastructure/persistence/contracts/IUserRepository"
import { UserAlreadyExist } from "@/src/exceptions/AlreadyExist"
import { InitialDataService } from "@/src/services/InitialDataService"


@injectable()
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {

    // FIELDS
    private readonly logger : ILogger
    private readonly userRepository : IUserRepository
    private readonly initialDataService : InitialDataService

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger,
        @inject(TYPES.UserRepository) userRepository : IUserRepository,
        @inject(TYPES.InitialDataService) initialDataService : InitialDataService
    
    ) {
        
        this.logger = logger
        this.userRepository = userRepository
        this.initialDataService = initialDataService
    }

    async Handle(request: SignUpCommand): Promise<void> {

        // LOG MESSAGE
        this.logger.info(`SignUpCommandHandler: Handling sign-up for email ${request.request.email}`)

        // CHECK IF USER EXISTANCE / IF NOT THROW ERROR
        const existingUser = await this.userRepository.findByEmail(request.request.email) !== null

        if(existingUser) throw new UserAlreadyExist()

        await auth.api.signUpEmail({

            body: {
                name: request.request.name,
                email: request.request.email,
                password: request.request.password,
                nativeLanguageId: request.request.nativeLanguageId,
                callbackURL: "http://localhost:3000/",
            }
            
            // returnHeaders: true --> To get the headers, you can pass the returnHeaders option to the endpoint.
            // asResponse: true To get the Response object, you can pass the asResponse option to the endpoint.
        })

        // SEED INITIAL DATA
        const newUser = await this.userRepository.findByEmail(request.request.email)
        
        if (newUser) await this.initialDataService.seedInitialListeningData(newUser.id)

        this.logger.info(`SignUpCommandHandler: Sign-up response successfully received for email ${request.request.email}`)
    }
}