const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Admin=require("../models/adminuser");

exports.userLogin=(req,res,next)=>{
    let fetchedUser;
    Admin.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(!user)
        {
            return res.status(401).json({
                message:"Please enter valid or password"
            });
        }
        fetchedUser=user;
            if(req.body.password==user.password)
            {
                return true;
            }
            else
            {
                return false;
            }
           
    })
    .then(result=>{
        console.log("result"+result);
        if(!result)
        {
            return res.status(401).json({
                message:"Please enter valid or password"
            });
        }
        const token=jwt.sign({email:fetchedUser.email, userId:fetchedUser._id},"pehli_fursat_se_nikal",{expiresIn:"1h"});
        res.status(200).json({
            token:token,
            expiresIn:3600,
            userId:fetchedUser._id
        });
    })
    .catch(err=>{
        return res.status(401).json({
            message:"Invalid authentication credentials"
        });
    });
    
};