# NodeRateLimiter
```text
@saverious/rate-limiter
``` implements rate limiting based on ip addresses, available for express.js servers.

Note: NodeRateLimiter uses in-memory storage to keep track of client requests, therefore is suitable only for small-scale servers.

# Install
```text
npm i rate-limiter
```

# Usage
```javascript
const limiter = require('@saverious/rate-limiter');
const express = require('express');
const app = express();

// use default rate-limiter settings
// app.use(limiter());

// use custom rate-limiter settings
app.use(limiter({
    windowMS: 20 * 1000,
    limit: 5
}));

// test endpoint
app.get('/', function(req, res) {
    res.status(200).json({ name: 'john doe' });
});

app.listen(80, () => {
    console.log('listening on port 80');
});
```