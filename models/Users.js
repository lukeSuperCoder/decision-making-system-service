const DB = require('../db/connection');

class Article{
    // 获取用户账号密码
    static all(params,cb){
        let sql='select * from user_database where userno = ? limit 1';
        let params=[];
        DB(sql,params,cb)
    }
    // 添加一篇文章
    static create(data,cb){
        DB('insert into articles(title,context) values(?,?)',[data.title,data.context],cb)
    }
}

module.exports=Article
