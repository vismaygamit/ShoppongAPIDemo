const Order=require("../models/order");
const uniqid=require("uniqid");

exports.createorder=(req,res,next)=>{
    // const url=req.protocol+'://'+req.get("host");
    // const uniq=req.body.name+uniqid();
    const order=new Order({
        // order_id:uniq,
        user_id:req.body.user_id,
        product_id:req.body.product_id,
        quantity:req.body.quantity,
        total_price:req.body.total_price,
        // reason:req.body.reason,
        orderunique_id:uniqid()
        
    });
    order.save()
    .then(result=>{
        res.status(201).json({
            message:"Order added successfully",
            order:{
                ...result,
                id:result._id
            }
        });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            message:"Order insertion failed"
        });
    });
};

exports.updateorder=(req,res,next)=>{
    console.log(req.body);
    const order=new Order({
        _id:req.body.id,
        user_id:req.body.user_id,
        product_id:req.body.product_id,
        quantity:req.body.quantity,
        total_price:req.body.total_price,
        modified_date:Date.now
       
    });
    Order.updateOne({_id:req.params.id},order)
    .then(result=>{
        // console.log("result"+result);
        if(result.n>0)
        {
            res.status(200).json({message:"Order updated successfully"});
        }
        else
        {
            // Auth failed 
            res.status(401).json({message:"Order updation failed"});   
        }
    })
    .catch(error=>{
        console.log("error"+error);
        res.status(500).json({
            message:"Couldn't update order"
        });
    });
};


exports.cancelorder=(req,res,next)=>{
    
    console.log(req.body);
    const order=new Order({
        _id:req.body.id,
        reason:req.body.reason,
        delete_date:Date.now,
        status:true
       
    });
    Order.updateOne({_id:req.params.id},order)
    .then(result=>{
        // console.log("result"+result);
        if(result.n>0)
        {
            res.status(200).json({message:"Order deleted successfully"});
        }
        else
        {
            // Auth failed 
            res.status(401).json({message:"Order deletion failed"});   
        }
    })
    .catch(error=>{
        console.log("error"+error);
        res.status(500).json({
            message:"Couldn't update delete"
        });
    });
};

// exports.deleteorder=(req,res,next)=>{
//     Order.deleteOne({_id:req.params.id})
//     .then(result=>{
//         if(result.n>0)
//         {
//             res.status(200).json({message:"Order deleted successfully"});
//         }
//         else
//         {   
//             // Auth failed 
//             res.status(401).json({message:"Order deletetion failed"});
//         }
//     }).
//     catch(error=> {
//         res.status(500).json({
//             message:"Couldn't delete order"
//         });
//     });
// };


exports.getorderbyuid=(req, res, next) => {
    Order.find({user_id:req.params.userid}).then(order => {
        // console.log(category);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found!" });
      }
    })
    .catch(error=>{
        console.log(error);
      res.status(500).json({
        message:"Couldn't fetched order!"
      });
    });
};