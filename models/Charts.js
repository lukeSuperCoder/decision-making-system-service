const DB = require('../db/connection');

class Charts{
    // 获取基本图表分析数据
    static getBaseChart(data,cb){
        DB("SELECT * from origin_database where time BETWEEN ? and ? and params = ? order by time",[data.date[0],data.date[1],data.param],cb)
    }

    // 获取knn分析数据
    static getKnnChart(data,cb){
        DB("SELECT * FROM `"+data.fun+"` where time BETWEEN ? and ? order by time",[data.date[0],data.date[1]],cb)
    }
    // 获取knn分析数据
    static getHxgChart(data,cb){
        DB("SELECT x as time,"+data.params+" FROM `"+data.fun+"`",[data.params,data.fun],cb)
    }
    static getKnnTable(data, cb) {
        var start = (data.pageNo - 1) * 10;
        var params_str = ''
        data.param.forEach((e) => {
            params_str = params_str+"`"+e+"`,"
        });
        let sql='SELECT '+params_str+' number,list,DATE_FORMAT(time,"%Y-%m-%d") as time FROM `knn_database` where time BETWEEN ? and ? and number in ('+data.number.toString()+') order by time limit ?,?';
        DB(sql,[data.date[0], data.date[1],start, parseInt(data.pageSize)],cb)
    }
    static count(data,cb){
        let sql='SELECT count(*) as total FROM `knn_database` where time BETWEEN ? and ? and number in ('+data.number.toString()+')';
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
