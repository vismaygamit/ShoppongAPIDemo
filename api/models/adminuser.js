const mongoose=require("mongoose");
const uniqueValidator=require("mongoose-unique-validator");
const userSchema=mongoose.Schema({
id:{type:String,required:true,unique:true},
name:{type:String,required:true},    
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
contact:{type:String,required:true,unique:true},
address:{type:String},
image:{type:String},
unique_id:{type:String,required:true,unique:true},
created_date:{type:Date,default:Date.now,required:true},
modified_date:{type:Date,default:null,required:true},  
delete_date:{type:Date,default:null,required:true},
user_status:{type:Boolean,default:true,required:true}  
});

userSchema.plugin(uniqueValidator);
module.exports=mongoose.model("Adminuser", userSchema);

