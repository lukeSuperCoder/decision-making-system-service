const { DATE } = require('mysql/lib/protocol/constants/types');
const DB = require('../db/connection');

class Users{
    // 获取用户信息
    static all(params,cb){
        console.log(params);
        var start = (params.pageNo - 1) * 10;
        let sql = ''
        if(params.name==='') {
            sql='select * from user_database limit ?,?';
            DB(sql,[start, start+parseInt(params.pageSize)],cb)
        } else {
            sql='select * from user_database where username like CONCAT("%", ?, "%") limit ?,?';
            DB(sql,[params.name, start, parseInt(params.pageSize)],cb)
        }
        
        // let params=[];
    }
    // 获取用户信息
    static count(params,cb){
        let sql = ''
        if(params.name==='') {
            sql='select COUNT(*) as total from user_database';
            DB(sql,[params.name],cb)
        } else {
            sql='select COUNT(*) as total from user_database where username like CONCAT("%", ?, "%")';
            DB(sql,[params.name],cb)
        }
        
        // let params=[];
    }
    
    // 更新用户信息
    static updateuser(data,cb){
        let sql='update user_database set userno=?, username=?, likename=?, email=?, issuper=?, state=?, lasttime=NOW() where id = ?';
        // let params=[];
        DB(sql,[data.userno,data.username,data.likename,data.email,data.issuper,data.state,data.id],cb)
    }
    // 删除用户信息
    static deleteuser(data,cb){
        let sql='delete from user_database where id = ?';
        // let params=[];
        DB(sql,[data.id],cb)
    }
    // 删除多个用户信息
    static deleteuserid(data,cb){
        let sql='delete from user_database where id IN (?)';
        // let params=[];
        DB(sql,[data.ids],cb)
    }
    // 添加一篇文章
    static create(data,cb){
        DB('insert into user_database(userno,username,likename,email,password,issuper,state,createtime,lasttime) values(?,?,?,?,?,?,?,?,?)',[data.userno,data.username,data.likename,data.email,data.password,data.issuper,'0',new Date(),new Date()],cb)
    }
    // 用户登录
    static login(data,cb) {
        DB('select * from user_database where username=? and password=? and state=0 limit 1',[data.username, data.password],cb)
    }
}

module.exports=Users
