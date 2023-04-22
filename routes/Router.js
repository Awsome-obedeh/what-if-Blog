const express=require('express');
const router=express.Router();
const moment=require('moment')
const blogPost=require('./../models/blogPost.model');


// router.get('/', async(req,res)=>{
//     const posts=await blogPost.find();
//     console.log(posts)
    
//     res.render('index',{posts,moment})
 
// })

router.get('/about', (req,res)=>{
    res.render('about')
});



router.get('/allpost',async (req,res)=>{
    const posts=await blogPost.find();
    console.log(posts)
    
    res.render('index',{posts})
})

router.get('/post/:id', async(req,res)=>{
    const posts=await blogPost.find({_id:req.params.id});
    if(!posts){
        res.send({msg: 'Post not found'});

    }

    res.render('single_post',{posts})
})

module.exports=router;