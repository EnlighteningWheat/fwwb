const express = require('express');
const helmet = require('helmet');
const app = express();

// 使用Helmet中间件添加CSP标头
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        // 允许加载来自localhost:7474的内容
              frameAncestors: ["'self'", "http://localhost:7474/browser/"],
    }
}));

// 设置路由来处理对“localhost:7474”的请求
app.get('/example', (req, res) => {
    // 此处可以进行适当的处理，如向“localhost:7474”发送请求并返回响应
    // 示例中直接返回一个字符串
    res.send('Response from Express.js server');
});
