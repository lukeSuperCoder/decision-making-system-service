const mysql = require('mysql');

// 连接数据库的信息
db={
    host:'localhost',
    user:'root',
    password:'123456',
    database:'analysis_system',
    max_connections: 500
}

// 封装数据库连接方法
const connectionDB=(sql,params,cb)=>{
    // return new Promise((resolve,reject)=>{
        // 创建数据库连接
        const connection=mysql.createConnection(db);
        // 连接数据库
        connection.connect((err,conn)=>{
            if(err){
                console.log("数据库连接失败",err);
                return;
            }
            console.log("数据库连接成功,\n入参：    "+JSON.stringify(params)+"\nsql:    "+JSON.stringify(sql));
            connection.query(sql,params,cb)
        })

    // })
}

module.exports=connectionDB;
