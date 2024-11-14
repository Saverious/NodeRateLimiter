'use strict';

class RateLimiter {
    constructor(args){
        console.log('args passed: ', args)
        if(!args){
            // use default setup
            this.windowMS = 60 * 1000 * 60;
            this.limit = 500;

            this.__args = {
                windowMS: this.windowMS,
                limit: this.limit
            }
        }else{
            if(!args.windowMS || !args.limit){
                throw new Error('missing arguments');
            }

            this.windowMS = parseInt(args.windowMS);
            this.limit = parseInt(args.limit);

            if(typeof(this.windowMS) !== 'number' || typeof(this.limit) !== 'number'){
                throw new Error('args.windowMS and args.limit must be of type \'number\'');
            }
        }

        this.__args = {
            windowMS: this.windowMS,
            limit: this.limit
        }

        // in-memory storage
        this.__store = new Map();
    }

    getClient(clientKey) {
        const client = this.__store.get(clientKey);
        if(client) {
            return true;
        }

        return false;
    }

    // create a new client
    setClient(client) {
        this.__store.set(client, this.__args.limit);
    }

    // return remaining tokens before blocking request
    getTokens(client) {
        return this.__store.get(client);
    }

    //  refresh token
    setExpiry(client) {
        setTimeout(() => {
            this.__store.delete(client);
        }, this.__args.limit);
    }
}

export default RateLimiter;