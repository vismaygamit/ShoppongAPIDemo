const express=require("express");
const router=express.Router();
const UserController=require("../controllers/user");
router.post("/signup", UserController.createUser);

console.log("inside routes");
router.post("/login", UserController.userLogin);

router.get("", UserController.userList);

module.exports=router;
