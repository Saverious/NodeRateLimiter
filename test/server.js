import express from 'express';

// set global variables
const app = express();

// endpoint
app.get('/', function(req, res) {
    res.status(200).json({ name: 'john doe' });
});
  
export default app;