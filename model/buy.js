var mongoose=require("mongoose");
var Schema = mongoose.Schema;//创建模型
var Buy=new Schema({
    buyDate:Number,
    inside: [],
    buySite:String
})
var Buy=mongoose.model('Buy',Buy);
module.exports=Buy;