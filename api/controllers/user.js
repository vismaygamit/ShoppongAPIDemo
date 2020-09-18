const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const uniqid=require("uniqid");
const User=require("../models/user");

exports.createUser=(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
.then(hash=>{
  const user=new User({
  name:req.body.name,
  email:req.body.email,
  password:hash,
  contact:req.body.contact,
  image:req.body.image,
  unique_id:uniqid()  
    });
    user.save()
    .then(result=>{
res.status(201).json({
  message:"Account created successfully",
  result:result
});
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
      // error:{
        message:"Invalid details"
      // }
      // err
      });
    });
     });
};

exports.userLogin=(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email}).then(user=>{
    if(!user)
    {
      return res.status(401).json({
        message:"Auth Failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password,user.password);
  })
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message:"Auth Failed"
      });
    }
    const token=jwt.sign({email:fetchedUser.email, userId:fetchedUser._id},"secret_this_should_be_longer",
    {expiresIn:"1h"}
    );
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

exports.userList=(req,res,next)=>{
  const pageSize=+req.query.pagesize;
  const currentPage=+req.query.page;
  const postQuery=User.find();
  let fetchedUsers;
  console.log("pageinfo"+pageSize+" "+currentPage);
  if(pageSize && currentPage)
  {
    postQuery.skip(pageSize * (currentPage-1)).limit(pageSize);
  }
  postQuery.then(documents=>{
    console.log(documents);
    fetchedUsers=documents;
    return User.count();
  }).then(count=>{
    res.status(200).json({
      message:"Users fetched successfully",
      users:fetchedUsers,
      maxUsers:count
    });
  })
  .catch(error=>{
    res.status(500).json({
      message:"couldn't fetched users!"
    });
  });
  
  console.log(postQuery);
};
