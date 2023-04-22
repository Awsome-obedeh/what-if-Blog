const express=require('express');
const ejs=require('ejs');
const app=express();
const path=require('path');
const session=require('express-session')
const flash=require('connect-flash');
const methodOverride=require('method-override');
const cookie_Parser=require('cookie-parser');
const indexRoutes=require('./routes/index.routes.js');
const routes=require('./routes/Router.js');
const adminRoutes=require('./routes/admin.routes.js')
const mongoose=require('mongoose');

const PORT=process.env.PORT || 2000;


// connect to database
// mongoose.connect();

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://obedchidera1010:awsome@cluster0.akycug2.mongodb.net/node_class');
  // here use your database link from atlas or reate a document from mongo db
  console.log('database connected successfully');
}

// set body parse
app.use(express.urlencoded({extended: false}));

// set middleware
app.use(express.static(path.join(__dirname, 'assets')));
// session
app.use(session({
  secret:'waht-if',
  saveUninitialized: false,
  resave: false,

}));

app.use(flash())
app.use(cookie_Parser())


// global variable
app.use(function (req,res,next){
  res.locals.success_msg=req.flash('success_msg');

  next()
})


// method overide
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


// template
app.set('view engine','ejs');

// routes
app.use('/',indexRoutes)
app.use('/what-if',routes);
app.use('/what-if/admin',adminRoutes)






// 
// 
app.listen(PORT,()=>{
    console.log('app is runni on port 2000')
})

