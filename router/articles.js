const express = require('express');
// 导入数据库模型
const Article = require('../models/Article');

const router=express.Router();

// 获取所有文章
router.get('/articles',(req,res,next)=>{
    Article.all((err,data)=>{
        if(err){
            return next(err);
        }
        res.send(data)
    })
})

// 创建一篇文章
router.post('/articles',(req,res,next)=>{
    let url=req.body.url;
    read(url,(err,result)=>{
        if(err||!result){
            return res.status(500).send("error！");
        }
        Article.create({title:result.title,context:result.content},(err,data)=>{
            if(err){
                return next(err);
            }
            res.send(data)
        })
    })
})
module.exports=router
