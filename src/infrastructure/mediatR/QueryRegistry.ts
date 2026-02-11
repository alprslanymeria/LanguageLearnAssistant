// IMPORTS
import { IQuery, IQueryHandler } from "./IQuery"

export class QueryHandlerRegistry {

    // MAP TO STORE HANDLERS
    private handlers = new Map<string, IQueryHandler<IQuery<any>, any>>()

    // REGISTER TO MAP
    register<TResponse>(

        type: string,
        handler: IQueryHandler<IQuery<TResponse>, TResponse>

    ): void {

        this.handlers.set(type, handler)
    }

    // GET HANDLER FROM MAP
    get<TResponse>(

        type: string

    ): IQueryHandler<IQuery<TResponse>, TResponse> {

        const handler = this.handlers.get(type)

        if (!handler) {

            throw new Error(`No query handler registered for type: "${type}". Ensure the handler is registered in QueryModule.`)
        }

        return handler
    }
}
