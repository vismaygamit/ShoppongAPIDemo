const express=require("express");
const router=express.Router();
const ProductController=require("../controllers/product");

router.post("", ProductController.createproduct);
router.put("/:id", ProductController.updateproduct);
router.delete("/:id", ProductController.deleteproduct);
router.get("", ProductController.getproducts);
router.get("/:id", ProductController.getproduct);
router.post("/findproduct", ProductController.findproduct);
module.exports=router;