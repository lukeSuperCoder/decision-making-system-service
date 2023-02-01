const { DATE } = require('mysql/lib/protocol/constants/types');
const DB = require('../db/connection');

class Users{
    // 获取用户信息
    static all(params,cb){
        console.log(params);
        let sql = ''
        if(params.name==='') {
            sql='select * from user_database';
        } else {
            sql='select * from user_database where username like CONCAT("%", ?, "%")';
        }
        
        // let params=[];
        DB(sql,[params.name],cb)
    }
    // 更新用户信息
    static updateuser(data,cb){
        let sql='update user_database set userno=?, username=?, likename=?, email=?, issuper=?, lasttime=NOW() where id = ?';
        // let params=[];
        DB(sql,[data.userno,data.username,data.likename,data.email,data.issuper,data.id],cb)
    }
    // 删除用户信息
    static deleteuser(data,cb){
        let sql='delete from user_database where id = ?';
        // let params=[];
        DB(sql,[data.id],cb)
    }
    // 添加一篇文章
    static create(data,cb){
        DB('insert into user_database(userno,username,likename,email,password,issuper,createtime,lasttime) values(?,?,?,?,?,?,?,?)',[data.userno,data.username,data.likename,data.email,data.password,data.issuper,new Date(),new Date()],cb)
    }
}

module.exports=Users
