// IMPORTS
import { ICommand } from "./ICommand"
import { IPipelineBehavior } from "./IPipelineBehavior"
import { CommandHandlerRegistry } from "./CommandRegistry"

export class CommandBus {

    // CTOR
    constructor(
        
        private readonly registry: CommandHandlerRegistry,
        private readonly behaviors: IPipelineBehavior<any, any>[] = []

    ) {}

    async send<TResponse>(

        command: ICommand<TResponse>

    ): Promise<TResponse> {

        const handler = this.registry.get<TResponse>(command.type)

        // BUILD PIPELINE: HANDLER IS THE FINAL STEP, BEHAVIORS WRAP IN ORDER
        let pipeline: () => Promise<TResponse> = () => handler.Handle(command)

        // REVERSE SO FIRST BEHAVIOR IN ARRAY IS OUTERMOST (EXECUTED FIRST)
        for (const behavior of [...this.behaviors].reverse()) {

            const next = pipeline
            pipeline = () => behavior.Handle(command, next)
        }

        return pipeline()
    }
}