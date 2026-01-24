// IMPORTS
import { IQuery } from "./IQuery"
import { QueryHandlerRegistry } from "./QueryRegistry"

export class QueryBus {

    // CTOR
    constructor(registry: QueryHandlerRegistry) 
    {
        this.registry = registry
    }

    private readonly registry: QueryHandlerRegistry

    async send<TResponse>(

        query: IQuery<TResponse>

    ): Promise<TResponse> {

        const handler = this.registry.get<TResponse>(query.type)
        return handler.Handle(query)
    }
}