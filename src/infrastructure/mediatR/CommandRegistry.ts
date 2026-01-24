// IMPORTS
import { ICommand, ICommandHandler } from "./ICommand"

export class CommandHandlerRegistry {

    // MAP TO STORE HANDLERS
    private handlers = new Map<string, ICommandHandler<ICommand<any>, any>>()

    // REGISTER TO MAP
    register<TResponse>(

        type: string,
        handler: ICommandHandler<ICommand<TResponse>, TResponse>

    ): void {

        this.handlers.set(type, handler)
    }

    // GET HANDLER FROM MAP
    get<TResponse>(

        type: string

    ): ICommandHandler<ICommand<TResponse>, TResponse> {
        
        const handler = this.handlers.get(type)!

        return handler
    }
}
