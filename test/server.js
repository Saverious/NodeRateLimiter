import express from 'express';
import limiter from '../index.js';

// set global variables
const app = express();

// set custom rate limiting values
app.use(limiter({
    windowMS: 20,
    limit: 5
}));

// use default settings for limiter
// app.use(limiter());

// endpoint
app.get('/', function(req, res) {
    res.status(200).json({ name: 'john doe' });
});
  
export default app;