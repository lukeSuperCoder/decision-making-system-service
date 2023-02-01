const express = require('express');
// 导入数据库模型
const Users = require('../models/Users');

const router=express.Router();

// 获取所有文章
router.get('/getusers',(req,res,next)=>{
    Users.all(req.query,(err,data)=>{
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

// 更新用户信息
router.post('/editusers',(req,res,next)=>{
    Users.updateuser(req.body,(err,data)=>{
        if(err){
            return next(err);
        }
        res.send({
            code: 200,
            msg: '请求成功',
            data: []
        })
    })
})

// 删除某个用户
router.get('/deleteuser',(req,res,next)=>{
    Users.deleteuser(req.query,(err,data)=>{
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

// 新增某个用户
router.post('/insertuser',(req,res,next)=>{
    Users.create(req.body,(err,data)=>{
        if(err){
            return next(err);
        }
        res.send({
            code: 200,
            msg: '请求成功',
            data: []
        })
    })
})
module.exports=router
