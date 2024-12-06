'use strict';

class RateLimiter {
  constructor(args) {
    this.windowMS = null;
    this.limit = null;

    if(!args || !args.windowMS || !args.limit){
      // use default setup -> 500 req/hr
      this.windowMS = 60 * 1000 * 60;
      this.limit = 429;
    }else{
      this.windowMS = parseInt(args.windowMS);
      this.limit = parseInt(args.limit);

      if(typeof(this.windowMS) !== 'number' || typeof(this.limit) !== 'number'){
        throw new Error('args.windowMS and args.limit must be of type \'number\'');
      }
    }
    
    this.__args = {
      windowMS: this.windowMS,
      limit: this.limit - 1 // first request always passes. Include it in request count
    }

    // in-memory storage
    this.__store = new Map();
  }

  clientExists(clientKey) {
    return this.__store.has(clientKey);
  }

  // create a new client
  setClient(client) {
    this.__store.set(client, this.__args.limit);
    this.refreshToken(client);
  }

  // return remaining tokens
  getTokens(client) {
    return this.__store.get(client);
  }

  // refresh token
  refreshToken(client) {
    setTimeout(() => {
      if(this.__store.has(client)){
        this.__store.delete(client);
      }
    }, this.__args.windowMS);
  }
}

export default RateLimiter;