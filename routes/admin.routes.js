const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const moment=require('moment')
const admin=require("./../models/admin.model.js");
const blogpost=require("./../models/blogPost.model.js")
const {truncate}=require('./../controllers/helpers.controllers.js');
const {authenticated}=require('./../controllers/app.controllers.js');

// @ GET what-if/admin/
// get admin login page
router.get('/', (req,res)=>{
    let errorMsg="";
    res.render('admin/login' ,{errorMsg});
    

})

// @ GET what-if/admin/new
// get admin register page
router.get('/new',(req,res)=>{
    let errorMsg='';
    res.render('admin/new',{errorMsg})
});

// @ POSt what-if/admin/new
// create new admin
router.post('/new', async(req,res)=>{
    try{

   
        let errorMsg='';
        const {username,password}=req.body;
        if(password=='undefined' || username=='undefined'){
            errorMsg='fill in the empty fields';
            res.render('admin/login', {errorMsg})
        }
    else if(password.length < 8){
            errorMsg='Password must be greater than 8 characters';
            res.render('admin/new',{errorMsg})
        }
        else{
            let adminDetails=await admin.create(req.body);
            
            console.log(adminDetails) 
            res.redirect('/what-if/admin/create')
            
        }
     }
     catch(err){
        console.log(err);
     }
})


// @ POST what-if/admin/
    // get admin login page
    router.post('/', async(req,res)=>{
        try{

       
            let errorMsg=''
            const {username,password}=req.body;
            const userUsername=await admin.findOne({username:username})
             console.log(userUsername)
            if(userUsername==null){
                errorMsg='Invalid login Credentials';
                res.render('admin/login',{errorMsg});
            }
        
            const userPassword=bcrypt.compareSync(password,userUsername.password);
            if(userPassword==false){
                errorMsg='Invalid login Credentials';
                res.render('admin/login',{errorMsg});
            }
            else{
                res.cookie('status','UserIsLoggedIn')
                res.redirect('/what-if/admin/allpost')
            }
        }
        catch(err){
            console.log(err);
        }
        

    })

// @ GET what-if/admin/create
// create blog post
router.get('/create', (req,res)=>{
    res.render('admin/create');
})

// @ POST what-if/admin/create
// create blog post
router.post('/create', authenticated,async (req,res)=>{

    try{
        let errorMsg='';
        const{ title,description,author,post }=req.body;
        if(title==null || description==null  || author==null || post == null){
            errorMsg='please fill in all fields';
            res.render('admin/new',{errorMsg})
        }
        else{
            const blog=await blogpost.create(req.body);
            // res.render('admin/new',
            // {title,description,author,post})
            console.log(blog);
            req.flash("success_msg","Post Created Sucessfully")
            res.redirect('/what-if/admin/allPost');
            
        }
        
           
    }
    catch (err){
        console.log(err);
    }

})

// @ GET what-if/admin/allpost
// Get all post
router.get('/allpost', authenticated, async (req,res)=>{
    try{
        const posts=await blogpost.find()
        .sort({createdAt:'desc'});
    
        res.render('admin/allpost',{posts,truncate})
    }

    catch(err){
        console.log(err);
    }
    
})

// @ GET what-if/admin/edit
// get edit blog post

router.get('/edit/:id',authenticated,async(req,res)=>{
    try{
        
        
    const post=await blogpost.findById(req.params.id)
    if(!post){
        res.send('no story found');
    }
    res.render('admin/edit_post',{post,moment})
    }
    catch(err){
        console.log(err);
        res.send(500, {Msg:'Blog Post not found'});
    }
    
})

// @ PUT what-if/admin/edit/:id
// update blog post

router.put('/edit/:id',authenticated,async(req,res)=>{
   
    const post=await blogpost.findByIdAndUpdate({_id:req.params.id}, req.body,{
        new:true,
        runValidators:true});

        if(post!=null){
            req.flash('success_msg',"Updated successfully");
            res.redirect('/what-if/admin/allpost')
        }
})

router.delete('/delete/:id', authenticated,async(req,res)=>{
    try{
        const post=await blogpost.findByIdAndDelete({_id:req.params.id});
        if(!post){
        res.send({msg:"no story found"});
        }
        req.flash('success_msg',"Post Deleted Successsfully");
        res.redirect('/what-if/admin/allpost');
    }
    catch(err){
        console.log(err);

    }
   

})

router.get('/logout',authenticated,(req,res)=>{
    // req.session.destroy;
    req.session.destroy(function() {
        res.clearCookie('status', { path: '/' });
        res.redirect('/');
    });
})

module.exports=router

