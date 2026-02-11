// IMPORTS
import { IQuery } from "./IQuery"
import { IPipelineBehavior } from "./IPipelineBehavior"
import { QueryHandlerRegistry } from "./QueryRegistry"

export class QueryBus {

    // CTOR
    constructor(
        
        private readonly registry: QueryHandlerRegistry,
        private readonly behaviors: IPipelineBehavior<any, any>[] = []

    ) {}

    async send<TResponse>(

        query: IQuery<TResponse>

    ): Promise<TResponse> {

        const handler = this.registry.get<TResponse>(query.type)

        // BUILD PIPELINE: HANDLER IS THE FINAL STEP, BEHAVIORS WRAP IN ORDER
        let pipeline: () => Promise<TResponse> = () => handler.Handle(query)

        // REVERSE SO FIRST BEHAVIOR IN ARRAY IS OUTERMOST (EXECUTED FIRST)
        for (const behavior of [...this.behaviors].reverse()) {

            const next = pipeline
            pipeline = () => behavior.Handle(query, next)
        }

        return pipeline()
    }
}