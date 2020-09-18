const express=require("express");
const router=express.Router();
const AdminController=require("../controllers/adminuser");

// router.post("/signup", AdminController.createUser);
router.post("/login", AdminController.userLogin);

module.exports=router;