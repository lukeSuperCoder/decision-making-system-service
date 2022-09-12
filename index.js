const express = require('express');
const router = require('./router/index');
// 引入body解析
const bodyParser = require('body-parser');
const app = express();
const port=process.env.PORT||3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// 路由中间件要放在最后
app.use(router)

app.listen(port,()=>{
    console.log(`服务器地址:http://localhost:${port}`);
})

