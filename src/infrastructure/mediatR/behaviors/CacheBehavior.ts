// IMPORTS
import { inject, injectable } from "inversify"
import { TYPES } from "@/src/di/type"
import type { ICacheService } from "@/src/infrastructure/caching/ICacheService"
import type { IBaseRequest } from "@/src/infrastructure/mediatR/IBaseRequest"
import { ICacheableQuery } from "@/src/infrastructure/caching/Cache"
import { IPipelineBehavior } from "@/src/infrastructure/mediatR/IPipelineBehavior"


@injectable()
export class CacheBehavior<TRequest extends IBaseRequest, TResponse> implements IPipelineBehavior<TRequest, TResponse> {

    constructor(

        @inject(TYPES.CacheService) 
        private readonly cacheService: ICacheService
    ) {}

    // UTILS
    private isCacheable(request: TRequest): request is TRequest & ICacheableQuery {
    
        return typeof (request as any).getCacheKey === 'function';
    }

    async Handle(request: TRequest, next: () => Promise<TResponse>): Promise<TResponse> {

        if (this.isCacheable(request)) {

            const cacheKey = request.getCacheKey()

            return await this.cacheService.getOrSet(

                cacheKey.key,

                next,

                cacheKey.ttl || 3600
            )
        }

        return await next();
    }
}