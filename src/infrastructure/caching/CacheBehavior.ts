// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IQuery, IQueryHandler } from "@/src/infrastructure/mediatR/IQuery"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"


@injectable()
export class CacheBehavior<TRequest extends IQuery<TResponse>, TResponse> implements IQueryHandler<TRequest, TResponse> {

    constructor(

        @inject(TYPES.CacheService) 
        private readonly cacheService: ICacheService,
        private readonly innerHandler: IQueryHandler<TRequest, TResponse>
    ) {}

    // UTILS
    private isCacheable(request: TRequest): request is TRequest & ICacheableQuery {
    
        return typeof (request as any).getCacheKey === 'function';
    }

    async Handle(request: TRequest): Promise<TResponse> {

        if (this.isCacheable(request)) {

            const cacheKey = request.getCacheKey()

            return await this.cacheService.getOrSet(

                cacheKey.key,

                () => this.innerHandler.Handle(request),

                cacheKey.ttl || 3600
            )
        }

        return await this.innerHandler.Handle(request);
    }
}