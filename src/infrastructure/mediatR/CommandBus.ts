// IMPORTS
import { ICommand } from "./ICommand"
import { CommandHandlerRegistry } from "./CommandRegistry"

export class CommandBus {

    // CTOR
    constructor(registry: CommandHandlerRegistry) 
    {
        this.registry = registry
    }

    private readonly registry: CommandHandlerRegistry

    async send<TResponse>(

        command: ICommand<TResponse>

    ): Promise<TResponse> {

        const handler = this.registry.get<TResponse>(command.type)
        return handler.Handle(command)
    }
}