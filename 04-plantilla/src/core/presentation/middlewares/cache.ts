import {Request, Response, NextFunction} from 'express';
import { RedisBootStrap } from '../../../bootstrap/redis.bootstrap';


export class CacheMiddleware {

    constructor(private readonly redisBootstrap: RedisBootStrap) {

    }

    private setParams(key: string, params: Record<string, any>) {
        if(params) {
            Object.keys(params).forEach(param => {
                key = key.replace(`:${param}`,params[param]);
            })
        }

        return key;
    }

    build(prefix: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            let cachekey = prefix;
            cachekey = this.setParams(cachekey,req.params);
            cachekey = this.setParams(cachekey,req.query);
            cachekey = this.setParams(cachekey,req.body);

            const client = this.redisBootstrap.redisClientInstance;
            const value = await client.get(cachekey);

            if(value) {
                console.log("Response from cache");
                return res.json(JSON.parse(value));
            }

            console.log("Cache missed");
            res.locals.cachekey = cachekey;
        }
    }
}