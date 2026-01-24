// IMPORTS
import { IBaseRequest } from "./IBaseRequest"

/// <summary>
/// ICOMMAND WITHOUT RESPONSE
/// </summary>
export interface ICommand<TResponse = void> extends IBaseRequest {}

/// <summary>
/// ICOMMAND HANDLER WITHOUT RESPONSE
/// </summary>
export interface ICommandHandler<in TRequest extends ICommand , TResponse = void>
{
    Handle(request: TRequest): Promise<TResponse>
}