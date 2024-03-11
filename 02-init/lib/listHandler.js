const express = require('express');
const fs = require('fs');
const path = require('path');

const app = new express();

app.use(express.static('web'));

app.get('/pic/list',(req,res) => {
    const filepath = path.join(__dirname,'web/data/data.json');
    fs.readFile(filepath,(err,content) => {
        if(err){
            res.json({success:false});
            return;
        }
        res.json({success:true,data:JSON.parse(content)});
    });
});

app.listen(80,() => {
    console.log('server listening on port:80');
});