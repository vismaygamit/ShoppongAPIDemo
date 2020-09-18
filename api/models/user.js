const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");

// Auto Increment ID
Schema=mongoose.Schema;
var autoIncrement=require('mongoose-auto-increment');
const connection=mongoose.createConnection("mongodb+srv://vismay:T@nvi8758@cluster0.ikpvs.mongodb.net/shoppingdemo?retryWrites=true&w=majority",{useNewUrlParser:true});
autoIncrement.initialize(connection);



const userSchema=mongoose.Schema({
user_id:{type:Number,required:true,ref:'user_id',unique:true},
name:{type:String,required:true},    
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
contact:{type:String,required:true,unique:true},
image:{type:String},
unique_id:{type:String,required:true,unique:true},
user_status:{type:Boolean,default:true,required:true},
created_date:{type:Date,default:Date.now,required:true},
modified_date:{type:Date,default:null},  
delete_date:{type:Date,default:null},  
account:{type:String,default:"Vismay",required:true}
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(autoIncrement.plugin,{model:'User', field:'user_id', startAt:1,incrementBy:1});
module.exports=mongoose.model("User", userSchema);



// const mongoose=require("mongoose");
// const uniqueValidator=require("mongoose-unique-validator");
// const userSchema=mongoose.Schema({
// email:{type:String,required:true,unique:true},
// password:{type:String,required:true}
// });

// userSchema.plugin(uniqueValidator);
// module.exports=mongoose.model("User", userSchema);
