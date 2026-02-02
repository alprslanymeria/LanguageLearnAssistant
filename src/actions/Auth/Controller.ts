"use server"

// IMPORTS
import { APIError } from "better-auth"
import { TYPES } from "@/src/di/type"
import container from "@/src/di/container"
import { SignInCommandValidator } from "@/src/actions/Auth/Commands/SignIn/CommandValidator"
import { SignInRequest, SignUpRequest } from "@/src/actions/Auth/Request"
import { ILogger } from "@/src/infrastructure/logging/ILogger"
import { CommandBus } from "@/src/infrastructure/mediatR/CommandBus"
import { signInCommandFactory } from "@/src/actions/Auth/Commands/SignIn/CommandFactory"
import { SignUpCommandValidator } from "@/src/actions/Auth/Commands/SignUp/CommandValidator"
import { signUpCommandFactory } from "@/src/actions/Auth/Commands/SignUp/CommandFactory"
import { UserAlreadyExist } from "@/src/exceptions/AlreadyExist"
import { ServiceResultBase } from "@/src/infrastructure/common/ServiceResult"
import { HttpStatusCode } from "@/src/infrastructure/common/HttpStatusCode"
import { handleErrorBaseSerialized } from "@/src/infrastructure/common/ErrorHandler"


export async function SignIn(request: SignInRequest) {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("SignIn: SignInRequest data:", {request})

        // COMMAND
        const command = signInCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await SignInCommandValidator.parseAsync(command)        

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)

        return ServiceResultBase.success().toPlain()        
        
    } catch (error) {

        return handleErrorBaseSerialized({
            actionName: "SignIn",
            logger,
            error,
            expectedErrors: [APIError]
        })
    }
}


export async function SignUp(request: SignUpRequest) {

    // SERVICES
    const logger = container.get<ILogger>(TYPES.Logger)
    const commandBus = container.get<CommandBus>(TYPES.CommandBus)

    try {

        // LOG INFO
        logger.info("SignUp: SignUpRequest data:", {request})

        // COMMAND
        const command = signUpCommandFactory(request)

        // ZOD VALIDATION
        const validatedCommand = await SignUpCommandValidator.parseAsync(command)

        // SEND COMMAND TO BUS
        await commandBus.send(validatedCommand)

        return ServiceResultBase.success(HttpStatusCode.Created).toPlain()
        
    } catch (error) {
        
        return handleErrorBaseSerialized({
            actionName: "SignUp",
            logger,
            error,
            expectedErrors: [APIError, UserAlreadyExist]
        })
    }
    
}