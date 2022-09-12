const users = require('./users');
const menus = require('./menu');
const charts = require('./charts');
const express = require('express');

const router=express.Router();
router.use('/api',users);
router.use('/api',menus);
router.use('/api',charts);

module.exports=router
