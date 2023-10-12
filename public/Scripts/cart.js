const display_products = document.querySelector('#display_product');
let data;

function load_product(){
    fetch('/product/cart',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        console.log(res);
        if(res.message){
            alert(res.message);
            return;
        }
        if(!data)
            data =res
        else
            data = data.concat(res);
        res.forEach(ele=>{
            show_products(ele);
        })
        document.querySelectorAll('.increase').forEach(items=>items.addEventListener('click',inc_product))
        document.querySelectorAll('.decrease').forEach(items=>items.addEventListener('click',dec_product))
        document.querySelectorAll('.deleteBtn').forEach(items=>items.addEventListener('click',delete_product))
    })
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.setAttribute('id','M'+res.product_id)
    div.innerHTML=`
    <img src='${res.image}' class='thumbnail'>
    <p>${res.product_name}</p>
    <div class='pro-inc-dec'>
        <div class='increase' id='${res.product_id}'>+</div>
        <div class='quantity' id='Q${res.product_id}'>${res.quantity}</div>
        <div class='decrease' id='${res.product_id}'>-</div>
    </div>
    <br>
    <button id='${res.product_id}' class='deleteBtn'>Delete</button>
    <button id='${res._id}' class='buy-nowBtn'>Buy now</button>`
    display_products.appendChild(div);
}

function inc_product(){
    console.log(this.id);
    fetch('/product/increase',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='updated'){
            document.querySelector('#Q'+this.id).innerHTML = res.quantity;
        }
    })
    .catch(err=>{
        alert(err);
    })
}

function dec_product(){
    console.log(this.id);
    fetch('/product/decrease',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='updated'){
            document.querySelector('#Q'+this.id).innerHTML = res.quantity;
        }
    })
    .catch(err=>{
        alert(err);
    })
}

function delete_product(){
    console.log(this.id);
    fetch('/product/delete',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=>{return res.json()})
    .then(res=>{
        if(res.message==='deleted'){
            document.querySelector('#M'+this.id).remove();
        }
    })
    .catch(err=>{
        alert(err);
})
}

document.querySelector('#logoutBtn').addEventListener('click',()=>{

    fetch('/user/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res=>{
        return res.json();
    })
    .then(res=>{
        window.location.href = res.url;
    })
})

load_product();