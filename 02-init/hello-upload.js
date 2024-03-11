const express = require('express');
const formidable = require('formidable');
const path = require('path');

const app = new express();

app.use(express.static('web'));

app.post('/pic/upload',(req,res) => {
    const form = formidable({
        multiples:true,
        keepExtensions:true,
        uploadDir:path.join(__dirname,'web/data/pic'),
        filename:(name,ext) => {
            return `${name}-${Date.now()}${ext}`
        }
    });
    form.parse(req,(err,fields,files) => {
        if(err){
            res.json({success:false});
            return;
        }
        console.log('upload',fields,files);
        res.json({success:true});
    });  
});

app.listen(80,() => {
    console.log('server listening on port:80');
});