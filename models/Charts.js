const DB = require('../db/connection');

class Charts{
    // 获取基本图表分析数据
    static getBaseChart(data,cb){
        DB("SELECT * from origin_database where time BETWEEN ? and ? and params = ? order by time",[data.date[0],data.date[1],data.param],cb)
    }

    // 获取knn分析数据
    static getKnnChart(data,cb){
        DB("SELECT * FROM `knn_database` where time BETWEEN ? and ? and number = '3039' order by time",[data.date[0],data.date[1]],cb)
    }
}

module.exports=Charts
