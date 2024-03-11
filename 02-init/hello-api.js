const express = require('express');

const app = new express();

app.use(express.static('web'));

app.listen(80,() => {
    console.log('server listening on port:80');
});