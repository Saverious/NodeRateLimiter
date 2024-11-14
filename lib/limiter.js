'use strict';

class RateLimiter {
    constructor(args) {
        if(!args){
            // use default setup
            this.windowMS = 60 * 1000 * 60; // 1 hour
            this.limit = 500; // 500 req/hr

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

            this.__args = {
                windowMS: this.windowMS,
                limit: this.limit
            }
        }

        // in-memory storage
        this.__store = new Map();
        console.log('*** setup done ***')
        console.log(`windowMS: ${this.__args.windowMS}\nlimit: ${this.__args.limit}\n`)
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
        }, this.__args.windowMS);
    }
}

export default RateLimiter;