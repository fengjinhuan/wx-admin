var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
var Buy =require('../model/buy')

var User =require('../controllers/user')
var Wx =require('../controllers/wx')

mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost:27017/eat');
// 跨域
router.all('*', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("X-Powered-By",' 3.2.1');
res.header("Content-Type", "application/json;charset=utf-8");
next();
});


/* 后台网页版 */

router.get('/user/register',User.register);
router.get('/user/registerFlag',User.registerFlag);
router.get('/user/login',User.login);
router.get('/user/admin',User.admin);
router.get('/user/siteFlag',User.siteFlag);
router.get('/user/add',User.add);
router.get('/user/getListById',User.getListById);
router.get('/user/dellist',User.dellist);


// 微信

router.get('/wxhm',Wx.wxhm);
router.get('/wxct',Wx.wxct);
router.get('/wxls',Wx.wxls);
router.get('/wxlist',Wx.wxlist);
router.post('/wxbuy',Wx.wxbuy);


module.exports = router;
