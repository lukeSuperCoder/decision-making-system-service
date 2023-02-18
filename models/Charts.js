const DB = require('../db/connection');

class Charts{
    // 获取基本图表分析数据
    static getBaseChart(data,cb){
        DB("SELECT * from origin_database where time BETWEEN ? and ? and params = ? order by time",[data.date[0],data.date[1],data.param],cb)
    }

    // 获取knn分析数据
    static getKnnChart(data,cb){
        DB("SELECT * FROM `"+data.fun+"_database` where time BETWEEN ? and ? order by time",[data.date[0],data.date[1]],cb)
    }

    static getKnnTable(data, cb) {
        var start = (data.pageNo - 1) * 10;
        var params_str = ''
        console.log(data.date[1],start, start+parseInt(data.pageSize));
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
}

module.exports=Charts
