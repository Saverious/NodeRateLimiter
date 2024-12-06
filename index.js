'use strict';

import RateLimiter from './lib/limiter.js';
import { isIP } from 'node:net';

// implement rate limiting
export default function (args) {
    const limiter = new RateLimiter(args);

    return function (req, res, next) {
        const clientIP = req.ip || req.connection.remoteAddress;

        if(!isIP(clientIP)){
            return res.status(400).send(`Invalid IP address: ${clientIP}`);
        }

        if(limiter.clientExists(clientIP)){
            let tokens = limiter.getTokens(clientIP);
            if(tokens <= 0){
                // block request
                return res.status(429).send('You have reached your maximum request limits. Please try again later');
            }

            // reset value of token
            limiter.__store.set(clientIP, tokens - 1);
            next();
        }else{
            limiter.setClient(clientIP);
            next();
        }
    }
}