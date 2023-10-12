const express = require('express');
const session = require('express-session');
const userRouter = require('../routes/user_routes')
const productRouter = require('../routes/products_routes')
const adminRouter = require('../routes/admin_routes')
const db = require('./connection')
const path = require('path')
const multer = require('multer');
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname,'..','/public/uploads'))
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const upload  = multer({storage});


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'..','/public')))
// app.use();

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))


db.init()
.then(()=>{
    console.log('MongoDB is connected')
    app.listen(3000,(req,res)=>{
        console.log('Hearing PORT 3000')
    })
})
.catch(err=>console.log('Mongo Error'+err))

//user page requests -------
app.get('/',main)
app.get('/user',main)
app.get('/login',main)
app.use('/user',userRouter)
//---------------------------

//products requests ---------
app.get('/dashboard',(req,res)=>{
    res.redirect('/product/dashboard');
})
app.use('/product',productRouter)
//---------------------------

//admin requests ------------
app.use('/admin',upload.single('productImage'),adminRouter)
//---------------------------

function main(req,res){
    res.redirect('/user/login');
}
