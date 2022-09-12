const express = require('express');
// 导入数据库模型
const Menus = require('../models/Menu');

const router=express.Router();

// 获取槽号
router.get('/getNoMenu',(req,res,next)=>{
    Menus.getNoMenu((err,data)=>{
        if(err){
            return next(err);
        }
        res.send({
            code: 200,
            msg: '请求成功',
            data: [
                {
                    label: '电解槽',
                    value: "0",
                    children: data
                }
            ]
        })
    })
})

// 获取参数菜单
router.get('/getParamsMenu',(req,res,next)=>{
    Menus.getParamsMenu((err,data)=>{
        if(err){
            return next(err);
        }
        res.send({
            code: 200,
            msg: '请求成功',
            data: data
        })
    })
})

module.exports=router
