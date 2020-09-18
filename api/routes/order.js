const express=require("express");
const router=express.Router();
const checkAuth=require("../middleware/check-auth");
const OrderController=require("../controllers/order");

router.post("", OrderController.createorder);
router.put("/:id", OrderController.updateorder);
router.put("/cancelorder/:id", OrderController.cancelorder);
router.get("/findbyuserid/:userid", OrderController.getorderbyuid);
// router.get("", OrderController.getorders);
module.exports=router;