const{request,response}=require('express');
/* Logs users in
* @param {request} req 
* @param {response} res 
* @returns 
*/
const authenticated=async function(req,res,next){
    if(typeof req.cookies.status == "undefined"){
        res.redirect('/what-if/admin');
       
    }
    next()
}



module.exports={authenticated}