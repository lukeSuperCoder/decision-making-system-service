const DB = require('../db/connection');

class Charts{
    // 获取基本图表分析数据
    static getBaseChart(data,cb){
        DB("SELECT * from origin_database where time BETWEEN ? and ? and param_code = ? order by time",[data.date[0],data.date[1],data.param],cb)
    }
}

module.exports=Charts
