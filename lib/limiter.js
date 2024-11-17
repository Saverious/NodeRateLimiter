'use strict';

class RateLimiter {
  constructor(args) {
    this.windowMS = null;
    this.limit = null;

    if(!args){
      // use default setup -> 500 req/hr
      this.windowMS = 60 * 1000 * 60; // 1 hour
      this.limit = 500; // 500 requests
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
    return this.__store.get(clientKey);
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
      this.setClient(client);
    }, this.__args.windowMS);
  }
}

export default RateLimiter;