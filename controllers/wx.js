var Eat =require('../model/eat')
var Buy =require('../model/buy')
// 微信list菜单获取
exports.wxlist=function(req,res){
  Eat.findOne({userSite:req.query.name},function(err,doc){
    if(err){
      console.log(err)
    }
    res.send({tips:doc.inside})
  })
}
// 后门获取
exports.wxhm=function(req,res){
  Eat.find({userType:"后门餐饮"},'-userPass -userName -_id -userType -inside',function(err,doc){
    if(err){
      console.log(err)
    }
    res.send({tips:doc})
  })
}
// 餐厅获取
exports.wxct=function(req,res){
  Eat.find({userType:"学校餐厅"},'-userPass -userName -_id -userType -inside',function(err,doc){
    if(err){
      console.log(err)
    }
    res.send({tips:doc})
  })
}
// 宿舍零食获取
exports.wxls=function(req,res){
  Eat.find({userType:"宿舍零食"},'-userPass -userName -_id -userType -inside',function(err,doc){
    if(err){
      console.log(err)
    }
    res.send({tips:doc})
  })
}
// 微信买家记录
exports.wxbuy=function(req,res){
  var buyArr=req.body.buyArr
  var buySite=req.body.buySite
  var buyDate=req.body.buyDate
  var _buy= new Buy({
      buyDate:buyDate,
      buySite:buySite,
      inside:buyArr
  })
  _buy.save(function(err,doc){
    if(err){console.log(err)}
      console.log(doc)
      res.send({tips:'ok'})
  })
}