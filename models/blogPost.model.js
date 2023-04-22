const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'enter yourr blog  title']
    },

    description:{
        type:String,
        required:[true,'enter a valid blog description']
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    },

    post:{
        type:String,
        required:[true, 'entera blog story']

    },

    author:{
        type:String,
        require:[true,"enter an author's name"]
    }
}) 

const blogModel=mongoose.model('what-if-blogPost',blogSchema);
module.exports=blogModel