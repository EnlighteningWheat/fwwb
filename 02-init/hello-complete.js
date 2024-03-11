
        console.log('upload',fields,files);
        const filepath = path.join(__dirname,'web/data/data/json');
        fs.readFile(filepath,(err,content) => {
            if(err){
                res.json({success:false});
                return;
            }
            const data = JSON.parse(content);
            data.push({
                name:fields.name,
                phptographer:fields.phptographer,
                desc:fields.desc,
                picPath:`data/pic/${files.file.newFilename}`
            });
            fs.writeFile(filepath,JSON.stringify(data,null,2),(err) => {
                if(err){
                    res.json({success:false});
                    return;
                }
                res.json({success:true});
            });
        });
