// IMPORTS
import { IBaseRequest } from "./IBaseRequest"

/// <summary>
/// IQUERY WITH RESPONSE
/// </summary>
export interface IQuery<out TResponse> extends IBaseRequest { }

/// <summary>
/// IQUERY HANDLER
/// </summary>
export interface IQueryHandler<in TRequest extends IQuery<TResponse>, TResponse>
{
    Handle(request: TRequest): Promise<TResponse>
}