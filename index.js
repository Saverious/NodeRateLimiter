'use strict';

import RateLimiter from './lib/limiter.js';
import { isIP } from 'node:net';

// implement rate limiting
export default function(args) {
    const limiter = new RateLimiter(args);

    return function(req, res, next){
                const clientIP = req.ip || req.connection.remoteAddress;
        const isValidIP = isIP(clientIP);

        if(!isValidIP){
            throw new Error('Invalid IP address: ', clientIP);
        }

        const clientExists = limiter.getClient(clientIP);
        if(clientExists){
            let tokens = limiter.getTokens(clientIP);
            if(tokens === 0){
                res.statusCode = 429;
                res.send('You have reached your request limits. Please try again later');
            }else{
                // reset value of token
                tokens -= 1;
                limiter.__store.set(clientIP, tokens);
                next();
            }
        }else{
            limiter.setClient(clientIP);
            limiter.setExpiry(clientIP);
            next();
        }
    }
}