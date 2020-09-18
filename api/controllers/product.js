const Product=require("../models/product");
const uniqid=require("uniqid");

exports.createproduct=(req,res,next)=>{
    // const url=req.protocol+'://'+req.get("host");
    // const uniq=req.body.name+uniqid();
    const product=new Product({
        name:req.body.name,
        description:req.body.description,
        productunique_id:uniqid(),
        image:req.body.image,
        // image:req.file.filename,
        quantity:req.body.quantity,
        price:req.body.price,
        discount:req.body.discount
        
    });
    product.save()
    .then(result=>{
        res.status(201).json({
            message:"Product added successfully",
            product:{
                ...result,
                id:result._id
            }
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message:"Product insertion failed"
        });
    });
};


exports.updateproduct=(req,res,next)=>{
    console.log(req.body);
    const product=new Product({
        _id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        // image:req.file.filename,
        quantity:req.body.quantity,
        price:req.body.price,
        modified_date:Date.now,
        discount:req.body.discount
    });
    Product.updateOne({_id:req.params.id},product)
    .then(result=>{
        console.log("result"+result);
        if(result.n>0)
        {
            res.status(200).json({message:"Product updated successfully"});
        }
        else
        {
            // Auth failed 
            res.status(401).json({message:"Product updation failed"});   
        }
    })
    .catch(error=>{
        console.log("error"+error);
        res.status(500).json({
            message:"Couldn't update product"
        });
    });
};

exports.deleteproduct=(req,res,next)=>{
    Product.deleteOne({_id:req.params.id})
    .then(result=>{
        if(result.n>0)
        {
            res.status(200).json({message:"Product deleted successfully"});
        }
        else
        {   
            // Auth failed 
            res.status(401).json({message:"Product deletetion failed"});
        }
    }).
    catch(error=> {
        res.status(500).json({
            message:"Couldn't delete product"
        });
    });
};

exports.getproducts=(req, res, next) => {
    const pageSize= +req.query.pagesize;
    const currentPage= +req.query.page;
    const productQuery=Product.find();
    let fetchedproduct;
  if(pageSize && currentPage)
  {
    productQuery.skip(pageSize * (currentPage-1))
    .limit(pageSize);
  }
  productQuery.then(documents=>{
    console.log(documents);
    fetchedproduct=documents;
    return Product.count();

  }).then(count=>{
    res.status(200).json({
      message: "Product fetched successfully!",
      products: fetchedproduct,
      maxPosts:count,

    });
  })
  .catch(error=>{
    res.status(500).json({
      message:"Couldn't fetched product!"
      });
    });
  };    


exports.getproduct=(req, res, next) => {
    Product.findById(req.params.id).then(product => {
        // console.log(category);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch(error=>{
        console.log(error);
      res.status(500).json({
        message:"Couldn't fetched product!"
      });
    });
};

exports.findproduct=(req, res, next) => {
    // console.log("inside find");
    // console.log(req);
    Product.find({name:req.body.name}).then(product => {
        // console.log(category);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    })
    .catch(error=>{
        console.log(error);
      res.status(500).json({
        message:"Couldn't fetched product!"
      });
    });
};

