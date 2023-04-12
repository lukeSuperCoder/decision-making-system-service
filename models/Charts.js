const DB = require('../db/connection');
const { param } = require('../router/charts');

class Charts{
    // 获取基本图表分析数据
    static getBaseChart(data,cb){
        DB("SELECT * from origin_database where time BETWEEN ? and ? and params = ? order by time",[data.date[0],data.date[1],data.param],cb)
    }

    // 获取knn分析数据
    static getKnnChart(data,cb){
        console.log(data.fun);
        DB("SELECT * FROM `"+data.fun+"` where time BETWEEN ? and ? order by time",[data.date[0],data.date[1]],cb)
    }
    // 获取knn分析数据
    static getHxgChart(data,cb){
        if(data.params==='all') {
            data.params = '`all`'
        }
        DB("SELECT x as time,"+data.params+" FROM `"+data.fun+"`",[data.params,data.fun],cb)
    }
    static getKnnTable(data, cb) {
        var start = (data.pageNo - 1) * 10;
        var params_str = ''
        data.param.forEach((e) => {
            params_str = params_str+"`"+e+"`,"
        });
        if(data.pageSize===-1) {
            let sql1='SELECT '+params_str+' number,list,DATE_FORMAT(time,"%Y-%m-%d") as time FROM `knn_database` where time BETWEEN ? and ? and number in ('+data.number.toString()+') order by time';
            DB(sql1,[data.date[0], data.date[1]],cb)
        } else {
            let sql='SELECT '+params_str+' number,list,DATE_FORMAT(time,"%Y-%m-%d") as time FROM `knn_database` where time BETWEEN ? and ? and number in ('+data.number.toString()+') order by time limit ?,?';
            DB(sql,[data.date[0], data.date[1],start, parseInt(data.pageSize)],cb)
        }
        
    }
    static count(data,cb){
        let sql='SELECT count(*) as total FROM `knn_database` where time BETWEEN ? and ? and number in ('+data.number.toString()+')';
        DB(sql,[data.date[0], data.date[1]],cb)
    }

    static getJcTable(data, cb) {
        var start = (data.pageNo - 1) * 10;
        let sql='SELECT DATE_FORMAT(time,"%Y-%m-%d") as time,'+data.param+' FROM `'+data.tablename+'` where time BETWEEN ? and ? order by time limit ?,?';
        DB(sql,[data.date[0], data.date[1],start, parseInt(data.pageSize)],cb)
    }
    static jccount(data,cb) {
        let sql='SELECT count(*) as total FROM `'+data.tablename+'` where time BETWEEN ? and ? order by time';
        DB(sql,[data.date[0], data.date[1]],cb)
    }

    // 获取异常值分析数据
    static getAbnChart(data,cb){
        DB("SELECT * FROM `abnormal_database` where time BETWEEN ? and ? and number = '3039' order by time",[data.date[0],data.date[1]],cb)
    }
    //获取互相关分析数据
    static getAbnChart(data,cb){
        DB("SELECT * FROM `abnormal_database` where time BETWEEN ? and ? and number = '3039' order by time",[data.date[0],data.date[1]],cb)
    }
    //获取载入的参数
    static getLoadParams(data, cb) {
        if(data.name==='') {
            DB("SELECT * from load_data",[],cb)
        } else {
            DB("SELECT * from load_data WHERE name= ?",[data.name],cb)
        }
    }
    //获取值载入的参数
    static getValueLoad(data, cb) {
        if(data.type==='1') {
            DB("SELECT "+data.fun+" from `map-value` WHERE name= ?",[data.name],cb)
        } else {
            DB("SELECT num_leaves,eta,max_depth,min_data_in_leaf from `map-value` WHERE name= ?",[data.name],cb)
        }
    }
    //获取特征分析数据
    static getTzgc(data, cb) {
        DB("SELECT param, CONVERT(`"+data.name+"`, SIGNED) as value from `tzgc-database`  ORDER BY value desc",[data.name],cb)
    }
    
    //获取评价数据
    static getPjValue(data, cb) {
        DB("SELECT "+data.fun+" from `pjzb-database`  where target = ?",[data.name],cb)
    }
    static getLastJcCount(data, cb) {
        let sql='SELECT count(*) as count FROM `'+data.tablename+'`';
        DB(sql,[],cb)
    }
    static getLastJc(data, cb) {
        let sql='SELECT '+data.params+' FROM `'+data.tablename+'` where time = ? limit 1';
        DB(sql,[data.date],cb)
    }
    //更新载入的参数
    static setLoadParams(data, cb) {
        DB("REPLACE INTO load_data(start_time, name, end_time, numbers) VALUES (?,?,?,?)",[data.start_time,data.name,data.end_time,data.numbers],cb)
    }
    //删除载入的参数
    static deleteLoadParams(data, cb) {
        DB("DELETE FROM load_data where name =? ",[data.name],cb)
    }
}

module.exports=Charts
