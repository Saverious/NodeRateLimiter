const express = require('express');
const app = express();
const limiter = require('../index');

app.use(limiter({
    windowMS: 20,
    limit: 5
}));

app.use(limiter());
app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john doe' });
});

function sum (a, b) {
    return a + b;
}
  
module.exports = { app, sum };