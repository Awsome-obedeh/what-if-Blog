const express=require('express');
const router=express.Router();
const moment=require('moment')
const blogPost=require('./../models/blogPost.model');
const {truncate}=require('./../controllers/helpers.controllers.js');


router.get('/', async(req,res)=>{
    const posts=await blogPost.find().sort({createdAt:'desc'});
    console.log(posts)
    
    res.render('index',{posts,moment,truncate})
 
})

module.exports=router