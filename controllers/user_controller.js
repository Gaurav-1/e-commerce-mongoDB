const session = require('express-session');
const userSchema = require('../models/user_schema')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kohligaurav845@gmail.com",
    pass: "frsgmprjbzbdcpwn"
  },
});

function show_login(req,res){
    if(!req.session.userid)
        res.render('login')
    else if(req.session.role=='user')
        res.redirect('/product/dashboard')
    else if(req.session.role=='admin')
        res.redirect('/admin/dashboard')
}

async function login_user(req,res){
    const data = await userSchema.findOne({mail: req.body.usermail}).exec();
    
    if(data){
        if(data.password===req.body.password){
            req.session.username = data.name;
            req.session.userid = data._id;
            req.session.role = data.role;
            if(data.role==='user')
                res.status(200).json({id: data.name, url: '/product/dashboard', message: null})
            if(data.role==='admin')
                res.status(200).json({id: data.name, url: '/admin/dashboard', message: null})
        }
        else{
            res.status(401).json({message: 'Invalid Mail/Password', url: null})
        }
    }
    else{
        res.status(401).json({message: 'Invalid Mail/Password', url: null})
    }
}

function show_signup(req,res){
    if(!req.session.uerid)
        res.render('signup');
    else if(req.session.role=='user')
        res.redirect('/product/dashboard')
    else if(req.session.role=='admin')
        res.redirect('/admin/dashboard')
}

async function signup_user(req,res){
    const data = await userSchema.findOne({mail: req.body.usermail});
    console.log(data);
    if(data){
        res.json({message: 'User already exist',url: null})
        return;
    }

    const newuser = {
        name: req.body.username,
        mail: req.body.usermail,
        password: req.body.password,
        isVerified: false,
        role: 'user'
    }
    userSchema.create(newuser)
    .then((ress)=>{
        send_mail(newuser.mail);
        res.status(200).json({url: '/user',message: 'A verification link has been send sucessfully'});
    }).catch(err=>{
        res.json({message: 'User already exist',url: null})
        return;
    })
}

function logout_user(req,res){
    req.session.destroy();
    res.status(200).json({url: '/user'});
}

async function send_mail(mail){
    const data = await userSchema.findOne({mail: mail}).exec();
    const msg = `<p> Please verify your mail</p>`;
    
        const mail_content = {
          from: 'sumitsaini4000@gmail.com', // sender address
          to: mail, // list of receivers
          subject: "Verification mail", // Subject line
          text: "Verify your mail", // plain text body
          html: `Hello ${data.name},\n ${msg} ----  http://localhost:3000/user/verify/${data._id} \n Thanks for joining us.`, // html body
        }
        transporter.sendMail(mail_content,(err)=>{
            if(err)
                throw new Error(err);
            console.log('Mail send successfully');
        });
}

async function verify_mail(req,res){
    await userSchema.findByIdAndUpdate({_id: req.params.id},{isVerified: true},{new: true}).then(async ()=>{
        const data = await userSchema.findOne({_id: req.params.id}).exec();
        
        req.session.username = data.name;
        req.session.userid = data._id;
        
        res.redirect('/product/dashboard');
    }).catch(()=>{
        res.status(301).json({message: 'Verification failed'});
    })
}

function change_password(req,res){
    if(req.session.userid || req.params.id){
        res.render('change_password',{username: req.session.username});
        return;
    }
    res.redirect('/user');
}

async function update_password(req,res){
    const idd=req.session.userid || req.params.id;
    const data = await userSchema.findByIdAndUpdate({_id: idd},{password: req.body.password},{new: true}).then((result)=>{
        
        res.status(200).json({message: 'password updated successfully'})
    }).catch((err)=>{
        res.status(301).json({message: 'Failed to update the password'})
    })
}

async function send_forget_mail(req,res){
    const data = await userSchema.findOne({mail: req.body.mail}).exec();
    if(!data){
        res.status(404).json({message: 'Invalid mail address'});
        return;
    }
    const msg = `<p>Click the link to change password</p>`;
    
    const mail_content = {
        from: 'kohligaurav845@gmail.com',
        to: data.mail,
        subject: "Forget Password",
        text: "Change Password",
        html: `Hello ${data.name},<br> ${msg} <br>  http://localhost:3000/user/change_password/${data._id} <br> We are allways here to help you.`,
    }
    transporter.sendMail(mail_content,(err)=>{
        if(err)
            throw new Error(err);
        console.log('Mail send successfully');
        res.status(200).json({message: 'Link has been send please check your mail'})
    });
}

function forget_password(req,res){
    res.render('forget_password');
}


module.exports = {
    show_login,
    login_user,
    show_signup,
    signup_user,
    logout_user,
    verify_mail,
    change_password,
    update_password,
    send_forget_mail,
    forget_password,
}