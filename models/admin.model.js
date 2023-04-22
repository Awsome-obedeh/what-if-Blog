const mongose=require('mongoose');
const bcrypt=require('bcrypt');

const adminSchema= new mongose.Schema({
    username:{
        type:String,
        required:[true,'Enter Username']
    },

    password:{
        type:String,
        required:[true,'Enter password'],
        min:8,
        max:20

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

   
})
 adminSchema.pre('save',function (next){
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(this.password,salt);
    this.password=hashedPassword;
    next();
 })


//  userSchema.pre('save', function (next) {
//     // generate salt and password hash
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(this.password, salt);
  
//     // replace plain password with the password hash
//     this.password = hashedPassword;
  
//     next();
//   })

 const adminModel=mongose.model('New-What-if',adminSchema);
 module.exports=adminModel