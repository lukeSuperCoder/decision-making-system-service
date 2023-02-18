const express = require('express');
const async = require('async')
// 导入数据库模型
const Charts = require('../models/Charts');

const router=express.Router();

// 根据参数获取图表数据
router.post('/getBaseChart',(req,res,next)=>{
    let date = req.body.date.split(',')
    let param = req.body.params.split(',')
    let code = req.body.code.split(',')
    let option = []
    async.each(param, function(param_i, callback1){
        //遍历第二层，每个槽号对应一条曲线
        Charts.getBaseChart({date:date,param:param_i},(err,data)=>{
            if(err){
                return next(err);
            }
            option.push({
                name: param_i,
                data: data
            })
            callback1(null)
        })    
    }, function(err){
        res.send({
            code: 200,
            msg: '请求成功',
            data: option
        })
    })
    // async.each(code, function(code_i, callback1){
    //     //遍历第二层，每个槽号对应一条曲线
    //     Charts.getBaseChart({date:date,param:param,code:code_i},(err,data)=>{
    //         if(err){
    //             return next(err);
    //         }    
    //         let option_data = [] //定义配置项数据
    //         data.forEach((data_i) => {
    //             option_data.push([data_i.time, parseFloat(data_i.value)])
    //         })
    //         option.push({
    //             name: code_i,
    //             type: 'line',
    //             smooth: true,
    //             symbol: 'none',
    //             areaStyle: {
    //                 opacity: 0
    //             },
    //             data: option_data
    //         })
    //         callback1(null)
    //     })    
    // }, function(err){
    //     res.send({
    //         code: 200,
    //         msg: '请求成功',
    //         data: option
    //     })
    // })
    // async.each(code, function(element, callback){
    //     Charts.getBaseChart({date:date,code:element},(err,data)=>{
    //         if(err){
    //             return next(err);
    //         }
    //         let option = []
    //         data.forEach(e => {
    //             let option_data = []
    //             option.push({
    //                 name: e.body,
    //                 type: 'line',
    //                 smooth: true,
    //                 symbol: 'none',
    //                 areaStyle: {
    //                     opacity: 0
    //                 },
    //                 data: data
    //                 })
    //         });
    //         list.push({
    //             param: element,
    //             data: data,
    //         })
    //         callback(null)
    //     })
    // }, function (err) {
    //     res.send(list)
    // })

    // async.each(param, function(params_i, callback){
    //     //遍历第一层，每个参数对应一个图表
    //     let option = [] //定义图表配置项
    //     // console.log(list);
    //     // list.push({
    //     //     name: params_i,
    //     //     data: option
    //     // })
    //     // console.log(list);
    //     // callback(null)
    //     getOptionByCode(code, date, params_i).then((res) => {
    //         list.push({
    //             name: params_i,
    //             data: res
    //         })
    //         callback(null)
    //     })
    // }, function (err) {
    //     console.log(list);
    //     res.send(list)
    // })
        // var actions = [];
        // param.forEach((params_i) => {
        //     var action = () => {
        //         return new Promise((resolve) => {
        //             getOptionByCode(code, date, params_i).then((res) => {
        //                 list.push({
        //                     name: params_i,
        //                     data: res
        //                 })
        //                 resolve()
        //             })
        //         })
        //     }
        //     actions.push(action)       
        // })
        // Promise.all(actions).then(()=>{ // 调用Promise的all方法，传入方法数组，结束后执行then方法参数中的方法
        //     console.log("All done!");
        //     console.log(list);
        //     res.send(list)
        // });
    // var actions = [];  // 定义一个空的方法数组
    // // 循环调用
    // param.forEach((params_i) => {
    //     var action = () => { // 将每一次循环方法定义为一个方法变量
    //         return new Promise((resolve,reject) =>{ // 每个方法返回一个Promise对象，第一个参数为resolve方法
    //             let option = []
    //             async.each(code, function(code_i, callback1){
    //                 //遍历第二层，每个槽号对应一条曲线
    //                 Charts.getBaseChart({date:date,param:params_i,code:code_i},(err,data)=>{
    //                     if(err){
    //                         return next(err);
    //                     }    
    //                     let option_data = [] //定义配置项数据
    //                     data.forEach((data_i) => {
    //                         option_data.push([data_i.time, parseFloat(data_i.value)])
    //                     })
    //                     option.push({
    //                         name: code_i,
    //                         type: 'line',
    //                         smooth: true,
    //                         symbol: 'none',
    //                         areaStyle: {
    //                             opacity: 0
    //                         },
    //                         data: option_data
    //                     })
    //                     callback1(null)
    //                 })    
    //             }, function(err){
    //                 list.push({
    //                     param: params_i,
    //                     data: option,
    //                 })
    //                 resolve()
    //             })
    //         })
    //     }
    //     actions.push(action());  // 将每次循环调用的方法添加到方法数组中
    // })

    // Promise.all(actions).then(()=>{ // 调用Promise的all方法，传入方法数组，结束后执行then方法参数中的方法
    //     console.log("All done!",list);
    // });


})

// 根据参数获取图表数据
router.post('/getKnnChart',(req,res,next)=>{
    let date = req.body.date.split(',')
    let param = req.body.params.split(',')
    let number = req.body.numbers.split(',')
    let option = []
    if(req.body.chart==='4') {
        Charts.getKnnTable({date:date,pageNo:req.body.pageNo,pageSize:req.body.pageSize,param:param,number:number},(err,data) => {
            if(err){
                return next(err);
            }
            Charts.count({date:date,number:number,param:param},(err,count)=>{
                if(err){
                    return next(err);
                }
                res.send({
                    code: 200,
                    msg: '请求成功',
                    data: data,
                    total: count[0].total
                })
            })
        })  
    } else {
        Charts.getKnnChart({date:date, fun:req.body.fun},(err,data) => {
            if(err){
                return next(err);
            }
            param.forEach((param_i) => {
                let params_data = []
                data.forEach(time_i => {
                    if(number.indexOf(time_i.number)>=0) {
                        const time = time_i.time.getFullYear().toString()+'-'+(time_i.time.getMonth() + 1).toString()+'-'+time_i.time.getDate().toString()
                        params_data.push({
                            time: time,
                            body: '兰州铝业电解铝板块一厂(400kA)五车间二工区'+time_i.number+'#电解槽',
                            params: param_i,
                            value: time_i[param_i]
                        })
                    }      
                });
                option.push({
                    name: param_i,
                    data: params_data
                })
            })
            res.send({
                code: 200,
                msg: '请求成功',
                data: option
            })
        })
    }    
})

// 根据参数获取图表数据
router.post('/getAbnChart',(req,res,next)=>{
    let date = req.body.date.split(',')
    let param = req.body.params.split(',')
    let option = []
    Charts.getKnnChart({date:date},(err,data) => {
        if(err){
            return next(err);
        }
        param.forEach((param_i) => {
            let params_data = []
            data.forEach(time_i => {
                params_data.push({
                    time: time_i.time,
                    body: '兰州铝业电解铝板块二厂(200kA)三车间二工区3039#电解槽',
                    params: param_i,
                    value: time_i[param_i]
                })
            });
            option.push({
                name: '处理前：'+param_i,
                data: params_data
            })
        })
        Charts.getAbnChart({date:date},(err,data) => {
            if(err){
                return next(err);
            }
            param.forEach((param_i) => {
                let params_data = []
                data.forEach(time_i => {
                    params_data.push({
                        time: time_i.time,
                        body: '兰州铝业电解铝板块二厂(200kA)三车间二工区3039#电解槽',
                        params: param_i,
                        value: time_i[param_i]
                    })
                });
                option.push({
                    name: '处理后：'+param_i,
                    data: params_data
                })
            })
            res.send({
                code: 200,
                msg: '请求成功',
                data: option
            })
        })
    })
})
module.exports=router
