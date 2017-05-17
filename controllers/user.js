var Eat =require('../model/eat')
// 登录
exports.login=function(req,res){
	var userName=req.query.userName;
	var userPass=req.query.userPass;
	Eat.find({"userName":userName,"userPass":userPass},function(err,doc){
		if(err){
			console.log(err)
		}
		else if(doc.length<1){
			res.send({tips:false})
		}else if(doc.length>=1){
      var obj={
        name:doc[0].userName,
        id:doc[0]._id
      }
			res.send({tips:obj})
		}
		
	})
}
// 用户登录获取信息
exports.admin=function(req,res){
  var nowid=req.query.id;
  Eat.findById(nowid,function(err,doc){
    if(err){
      console.log(err)
    }   
    res.send({name:doc.userName,inside:doc.inside})  
  })
}
// 注册账号验证是否存在
exports.registerFlag=function(req,res){
  var userName=req.query.userName;
  Eat.findOne({userName:userName},function(err,doc){
    if (err) {
      console.log(err)
    }
    if(doc===null){
      res.send({tips:true})      
    }else{
      res.send({tips:false})
    }
  })
} 
// 注册店铺名验证是否存在
exports.siteFlag=function(req,res){
  var userName=req.query.userName;
  Eat.findOne({userSite:userName},function(err,doc){
    if (err) {
      console.log(err)
    }
    if(doc===null){
      res.send({tips:true})
      
    }else{
      res.send({tips:false})
    }
  }) 
}
// 注册
exports.register=function(req,res){
  var userName=req.query.userName;
  var userPass=req.query.userPass;
  var userType=req.query.type;
  var userSite=req.query.site;
  Eat.findOne({userName:userName},function(err,doc){
  	if (err) {
  		console.log(err)
  	}
    if(doc===null){
      var _eat=new Eat({
        userName:userName,
        userPass:userPass,
        userType:userType,
        userSite:userSite
      })
      _eat.save(function(err,doc){
        if(err){
          console.log(err)
        }
        res.send({userId:doc.id,tips:true})
      })  
    }else{
      res.send({tips:false})
    }
  })  
}
// 增加菜单
exports.add=function(req,res){
  var nowid=req.query.id;
  var _eat={
      name:req.query.name,
      price:req.query.price,
      type:req.query.lists,  
      date:req.query.time,
      num:0,
      flag:false,
      listId:req.query.listId
  }
  Eat.update({ _id: nowid }, { '$push': { inside: _eat } }, function (err, doc) {
    if (err) {
      console.log(err)
    }
    Eat.findById(nowid,function(err,docs){
      if(err){console.log(err)}
        res.send({tips:true,arr:docs.inside[docs.inside.length-1]})
    })    
  })
}
//查询具体餐名
exports.getListById=function(req,res){
  var listId=req.query.listId;
  var name=req.query.name;
  var arr=[];
  Eat.findOne({_id:listId},function(err,doc){
    if(err){
      console.log(err)
    }
    if(name==''){
      arr=doc.inside;
    }
    for(var i=0;i<doc.inside.length;i++){
        if(doc.inside[i].name==name){
         arr=[doc.inside[i]]
        }
      }
     res.send({tips:arr})   
  })
}
// 删除商品
exports.dellist=function(req,res){
  var userName = req.query.userName;
  var name = req.query.name;
  var type = req.query.type;
  var price = req.query.price;
  console.log(name,userName)
  // 数组不能写ID
  Eat.update({ userName: userName },
    { '$pull': { inside: { name:name,type:type,price:price} } }, function (err, data) {
      if (err) {
        console.log(err);
      }
      Eat.findOne({userName:userName},function(err,doc){
        if(err){
          console.log(err)
        }
        res.send({tips:true,arr:doc.inside})
     })
  }); 
};