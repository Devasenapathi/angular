const express = require('express');
var app = express();
const postsRoutes=require("./routes/posts");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect("mongodb://localhost:27017/test")
.then(()=>{
  console.log('connected successfully');
})
.catch(()=>{
  console.log("connection failed");
})


app.use((req,res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,OPTIONS,DELETE"
    );
    next();
})
app.use("/api/posts",postsRoutes);

module.exports=app;
