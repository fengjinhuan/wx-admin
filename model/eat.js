var mongoose=require("mongoose");

var Schema = mongoose.Schema;//创建模型
var Eat=new Schema({
    userName: String,
    userPass: String,
    userType:String,
    userSite:String,
    inside: []
})
var Eat=mongoose.model('Eat',Eat);
module.exports=Eat;