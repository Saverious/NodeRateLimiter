import express from 'express';
import limiter from '../index.js';

// set global variables
const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

// set 3req/5sec
app.use(limiter({
    windowMS: 5 * 1000,
    limit: 3
}));

// endpoint
app.get('/', function(req, res) {
    res.status(200).json({ name: 'john doe' });
});

// start server
const server = app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
  
export {url, server};