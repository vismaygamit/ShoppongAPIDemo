const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

// Auto Increment ID
Schema=mongoose.Schema;
var autoIncrement=require('mongoose-auto-increment');
const connection=mongoose.createConnection("mongodb+srv://vismay:T@nvi8758@cluster0.ikpvs.mongodb.net/shoppingdemo?retryWrites=true&w=majority",{useNewUrlParser:true});
autoIncrement.initialize(connection);

  


const orderSchema=mongoose.Schema({
  // id:{type:Number},  
  order_id:{type:Number,ref: 'order_id',required:true,unique:true},
user_id:{type:Number,required:true},
product_id:{type:Number,required:true},
quantity:{type:Number,required:true},
total_price:{type:Number,required:true},
order_date:{type:Date,default:Date.now,required:true},
cancel_date:{type:Date,default:Date.now,default:null},
reason:{type:String,default:null},
// unique_id:{type:String},
orderunique_id:{type:String,required:true,unique:true},
created_date:{type:Date,default:Date.now,required:true},
modified_date:{type:Date,default:null},  
delete_date:{type:Date,default:null},
status:{type:Boolean,default:false,required:true},

});




orderSchema.plugin(uniqueValidator);
orderSchema.plugin(autoIncrement.plugin,{model:'Order', field:'order_id', startAt: 1,incrementBy: 1});
module.exports=mongoose.model("Order",orderSchema);