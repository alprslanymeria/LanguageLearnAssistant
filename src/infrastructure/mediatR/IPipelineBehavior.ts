// IMPORTS
import { IBaseRequest } from "./IBaseRequest"

/// <summary>
/// MEDIATR PIPELINE BEHAVIOR INTERFACE
/// BEHAVIORS ARE EXECUTED IN ORDER BEFORE THE HANDLER
/// SUPPORTS BOTH QUERIES AND COMMANDS
/// </summary>
export interface IPipelineBehavior<TRequest extends IBaseRequest, TResponse> {

    Handle(request: TRequest, next: () => Promise<TResponse>): Promise<TResponse>
}
