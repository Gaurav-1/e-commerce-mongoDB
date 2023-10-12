const express = require('express');
const session = require('express-session');
const userSchema = require('../models/user_schema');
const productSchema = require('../models/product_schema');
const fs = require('fs')
const path = require('path');

function show_dashboard(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/user')
    else
        res.render('admin/dashboard',{username: req.session.username})
}

async function send_products(req,res){
    const products = await productSchema.find({});
    
    if(products){
        const send_products = products.slice(req.body.pages,req.body.pages+5);
        res.status(200).json(send_products);
    }
    else{
        re.send(301).json({messgae:'No product available right now'})
    }
}

async function update_product(req,res){
    
    const updateProduct = {
        product_name: req.body.product_name,
        desc: req.body.desc,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity)
    }
    
    const isupdate = await productSchema.updateOne({_id: req.body.id},updateProduct)
    if(isupdate.modifiedCount === 1)
        res.json({message: 'Product Updated'})
    else
        res.json({message: "Can't update product"})
}

function show_add_product(req,res){
    if(!req.session.userid || req.session.role!='admin')
        res.redirect('/user')
    else
        res.render('admin/add_product',{username: req.session.username})
}

function add_product(req,res){
    
    const newProduct = {
        product_name: req.body.names,
        desc: req.body.desc,
        price: req.body.price,
        quantity: req.body.quantity,
        image: '/uploads/'+req.file.filename,
    }

    productSchema.create(newProduct)
    .then((ress)=>{
        res.status(200).json({message: 'Product added sucessfully'});
    }).catch(err=>{
        res.json({message: err.message})
    })
}

async function delete_product(req,res){
    await productSchema.findById({_id: req.body.id})
    .then(res=>{
        const imgdeleted = fs.unlinkSync(path.join(__dirname,'..','/public/'+res.image));
        (imgdeleted)?res.json({message: "Unable to delete image"}):'';
    })
    const isdeleted = await productSchema.deleteOne({_id: req.body.id});

    if(isdeleted.deletedCount==1)
        res.json({message: 'Sucessfully deleted'})
    else
        res.json({message: 'Failed to delete'})
}

module.exports = {
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
}