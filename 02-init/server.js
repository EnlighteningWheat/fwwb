// 服务端代码
const express = require('express');
const formidable = require('formidable');
const path = require('path');

const app = new express();

//登陆注册功能
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const usersFile = path.join(__dirname, 'web', 'data', 'users.json');
const fs = require('fs').promises;

const PORT = 3000;

app.use(express.json()); // Use built-in express.json() middleware
app.use(express.static('public'));

// Serve login.html
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'login.html'), { contentType: 'text/html' });
});

// Serve register.html
app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'register.html'), { contentType: 'text/html' });
});

// Handle registration form submission
app.post('/web/register', async (req, res) => {
    try {
        const { username: registerUsername, password: registerPassword } = req.body;

        // Log the values for debugging
//        console.log('registerUsername:', registerUsername);
//        console.log('registerPassword:', registerPassword);
//        console.log('registerConfirmPassword:', registerConfirmPassword);

        if (!registerUsername || !registerPassword) {
            // Log the error message
            //console.error('Invalid registration data:', { registerUsername, registerPassword });

            return res.status(400).json({ error: 'Invalid registration data' });
        }

        const hashedPassword = await bcrypt.hash(registerPassword, 10);

        let users = [];
        try {
            const data = await fs.readFile(usersFile, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is empty, no need to handle the error here
            if (error.code === 'ENOENT') {
                // File doesn't exist, create an empty array
                await fs.writeFile(usersFile, '[]');
            } else {
                console.error('Error reading user data:', error);
                return res.status(500).send('Error reading user data');
            }
        }

        if (users.some(user => user.username === registerUsername)) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        users.push({
            username: registerUsername,
            password: await bcrypt.hash(registerPassword, 10),
        });

        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

        res.status(200).json({ success: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle login form submission
app.post('/web/login', async (req, res) => {
    try {
        const { username: loginUsername, password: loginPassword } = req.body;

        let users = [];
        try {
            const data = await fs.readFile(usersFile, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, handle it accordingly
                return res.status(401).json({ error: 'No registered users' });
            } else {
                console.error('Error reading user data:', error);
                return res.status(500).send('Error reading user data');
            }
        }

        const user = users.find(u => u.username === loginUsername);

        // Log the values for debugging
        console.log('loginUsername:', loginUsername);
        console.log('loginPassword:', loginPassword);

        if (user && await bcrypt.compare(loginPassword, user.password)) {
            res.status(200).json({ success: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//
//画廊功能
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