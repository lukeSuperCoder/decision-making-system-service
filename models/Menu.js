const DB = require('../db/connection');

class Menu{
    // 获取槽号菜单
    static getNoMenu(cb){
        let sql='select body as label, substr(body,25,4) as value from origin_database GROUP BY body order by body';
        let params=[];
        DB(sql,params,cb)
    }
     // 获取参数菜单
     static getParamsMenu(cb){
        let sql='select params as value ,params as label from origin_database GROUP BY params order by params';
        let params=[];
        DB(sql,params,cb)
    }
}

module.exports=Menu
