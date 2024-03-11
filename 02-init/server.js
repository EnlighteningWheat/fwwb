// 服务端代码
const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

const app = new express();

// app.get('/',(req,res) => {
//     res.send('hello express');
// });

app.use(express.static('web'));

// app.get('/hello/get',(req,res) => {
//     res.send('hello /hello/get');
// });

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
            console.log(err);
            res.json({success:false});
            return;
        }
        console.log('upload',fields,files);

        //保存上传文件
        const filepath = path.join(__dirname,'web/data/data.json');
        fs.readFile(filepath,(err,content) => {
            if(err){
                console.log(err);
                res.json({success:false});
                return;
            }
            const data = JSON.parse(content);
            data.push({
                name:fields.name,
                author:fields.author,
                desc:fields.desc,
                picPath:`data/pic/${files.file.newFilename}`
            });
            // item={
            //     name:fields.name,
            //     author:fields.author,
            //     desc:fields.desc,
            //     picPath:`data/pic/${files.file.newFilename}`
            // };
            // appendPic(item);
            fs.writeFile(filepath,JSON.stringify(data,null,2),(err) => {
                if(err){
                    res.json({success:false});
                    return;
                }
                res.json({success:true});
            });
        });
        //res.json({success:true});
    });  
});

app.listen(80,() => {
    console.log('server listening on port:80');
})