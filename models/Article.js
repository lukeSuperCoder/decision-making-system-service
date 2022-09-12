const DB = require('../db/connection');

class Article{
    // 获取所有文章
    static all(cb){
        let sql='select * from abnormal_database limit 1';
        let params=[];
        DB(sql,params,cb)
    }
    // 添加一篇文章
    static create(data,cb){
        DB('insert into articles(title,context) values(?,?)',[data.title,data.context],cb)
    }
}

module.exports=Article
