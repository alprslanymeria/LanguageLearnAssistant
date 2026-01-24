// IMPORTS
import { inject, injectable } from "inversify"
import { headers } from "next/headers"
import { TYPES } from "@/src/di/type"
import { auth } from "@/src/infrastructure/auth/auth"
import { ICommandHandler } from "@/src/infrastructure/mediatR/ICommand"
import { SignInCommand } from "@/src/actions/Auth/Commands/SignIn/Command"
import type { ILogger } from "@/src/infrastructure/logging/ILogger"


@injectable()
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
    
    // FIELDS
    private readonly logger : ILogger

    // CTOR
    constructor(
        
        @inject(TYPES.Logger) logger : ILogger
    
    ) {
        
        this.logger = logger;
    }
    
    async Handle(request: SignInCommand): Promise<void> {

        // LOG MESSAGE
        this.logger.info(`SignInCommandHandler: Handling sign-in for email ${request.request.email}`)

        await auth.api.signInEmail({

            body: {
                email: request.request.email,
                password: request.request.password,
                callbackURL: "/"
            },
            headers: await headers(),
            // returnHeaders: true --> To get the headers, you can pass the returnHeaders option to the endpoint.
            // asResponse: true To get the Response object, you can pass the asResponse option to the endpoint.
        })

        this.logger.info(`SignInCommandHandler: Sign-in response successfully received for email ${request.request.email}`)
    }
}

