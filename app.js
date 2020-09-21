const path=require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");



const userRoutes=require("./api/routes/user");
const adminuserRoutes=require("./api/routes/adminuser");
const categoryRoutes=require("./api/routes/categories");
const productRoutes=require("./api/routes/product");
const orderRoutes=require("./api/routes/order");

const app=express();
mongoose.connect("mongodb+srv://vismay:#password@cluster0.ikpvs.mongodb.net/#database?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>{
console.log("Connected to database");
})
.catch(()=>{
console.log("connection failed");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
// QuBqs0T45GDKPlIG

// autoIncrement.initialize(connection);

app.use("/api/user",userRoutes);
app.use("/api/admin",adminuserRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/order",orderRoutes);

module.exports = app;
