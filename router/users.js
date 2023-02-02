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
        Users.count(req.query,(err,count)=>{
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

// 删除多个用户
router.post('/deleteuserid',(req,res,next)=>{
    Users.deleteuserid(req.body,(err,data)=>{
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
//登录
router.post('/login',(req,res,next)=>{
    Users.login(req.body,(err,data)=>{
        if(err){
            return next(err);
        }
        if(data.length!==0) {
            res.send({
                code: 200,
                msg: '请求成功',
                data: data
            })
        } else {
            res.send({
                code: 500,
                msg: '用户名或密码错误',
                data: []
            })
        }
        
    })
})
module.exports=router
