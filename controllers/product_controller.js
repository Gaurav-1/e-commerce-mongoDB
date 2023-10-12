const productSchema = require('../models/product_schema');
const cartSchema = require('../models/cart_schema');
const product = require('../models/product_schema');
const { set } = require('mongoose');

function show_dashboard(req,res){
    if(!req.session.userid || req.session.role!='user')
        res.redirect('/user')
    else
        res.render('dashboard',{username: req.session.username})
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

async function add_to_cart(req,res){
    const cart = await cartSchema.findOne({user_id: req.session.userid});
    const item = await productSchema.findById({_id: req.body.id});
    //console.log(cart);
    if(!item){
        res.json({message: 'Item not found'});
        return;
    }
    if(cart){
        const item_exist = cart.products.findIndex((items)=> items.product_id === req.body.id);
        console.log(item_exist);
        if(item_exist>-1){
            let set_quantity = cart.products[item_exist];
            console.log(set_quantity);
            set_quantity.quantity += 1;
            cart.products[item_exist] = set_quantity;
            await cart.save();
            res.status(200).json({message: 'Item updated'})
        }else{
            cart.products.push({
                product_id: req.body.id,
                product_name: item.product_name,
                price: item.price,
                quantity: 1,
                image: item.image,  
            })
            await cart.save();
            console.log(cart)
            res.status(200).json({message: 'Item added to cart'})
        }
    }
    else{
        const newcart = {
            user_id: req.session.userid,
            products: [{
                product_id: req.body.id,
                product_name: item.product_name,
                price: item.price,
                quantity: 1,
                image: item.image,
            }]
        }
        console.log(newcart);
        await cartSchema.create(newcart)
        .then(ress=>{
            res.status(200).json({message: 'Product added successfully'})
        })
        .catch(err=>{
            res.status(301).json({message: 'Failed to add to cart'})
        })
    }
}

function show_cart(req,res){
    if(!req.session.userid || req.session.role!='user')
        res.redirect('/user')
    else
        res.render('cart',{username: req.session.username})
}

async function send_cart(req,res){
    const cart = await cartSchema.findOne({user_id: req.session.userid});
    
    if(cart && cart.products.length>0){
        // const cart_products = cart.slice(req.body.pages,req.body.pages+5);
        res.status(200).json(cart.products);
    }
    else{
        res.json({message:'Cart is empty'})
    }
}

async function inc_cart_product(req,res){
    const cart = await cartSchema.findOne({user_id: req.session.userid});
    const max = await productSchema.findById({_id: req.body.id});
    console.log(max.quantity);
    const item_exist = cart.products.findIndex((items)=> items.product_id === req.body.id);
    console.log(item_exist);

    let set_quantity = cart.products[item_exist];
    console.log(set_quantity);
    set_quantity.quantity++;
    if(set_quantity.quantity>max.quantity){
        set_quantity.quantity--;
        res.json({Limit: 'Maximum limit reached'})
    }
    cart.products[item_exist] = set_quantity;
    await cart.save();
    res.status(200).json({message: 'updated',quantity: set_quantity.quantity})
}

async function dec_cart_product(req,res){
    const cart = await cartSchema.findOne({user_id: req.session.userid});
    
    console.log(cart);
    const item_exist = cart.products.findIndex((items)=> items.product_id === req.body.id);
    console.log(item_exist);

    let set_quantity = cart.products[item_exist];
    console.log(set_quantity);
    set_quantity.quantity--;
    if(set_quantity.quantity<1){
        set_quantity.quantity++;
        res.json({Limit: 'Minimun limit reached'})
    }
    cart.products[item_exist] = set_quantity;
    await cart.save();
    res.status(200).json({message: 'updated',quantity: set_quantity.quantity})
}

async function delete_cart_product(req,res){
    const cart = await cartSchema.findOne({user_id: req.session.userid});
    
    console.log(cart);
    const item_exist = cart.products.findIndex((items)=> items.product_id === req.body.id);
    // console.log('I'+item_exist);

    const chk = cart.products.splice(item_exist,1)
    // console.log('Chk'+chk);
    await cart.save();
    res.status(200).json({message: 'deleted'})
}


module.exports = {
    show_dashboard,
    send_products,
    show_cart,
    send_cart,
    add_to_cart,
    inc_cart_product,
    dec_cart_product,
    delete_cart_product,
}