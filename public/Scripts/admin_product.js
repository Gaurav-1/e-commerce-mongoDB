const display_products = document.querySelector('#display_product');
let pages = 0;
let data;

function load_product(){
    fetch('/product/get_products',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pages: pages
        })
    })
    .then(res=>{
        if(res.status===200)
           return res.json();
    })
    .then(res=>{
        if(!data)
            data =res
        else
            data = data.concat(res);
        res.forEach(ele=>{
            show_products(ele);
        })
        display_products.scrollTop = display_products.scrollHeight;
        window.scrollTo(0,display_products.scrollHeight);
        pages+=5;
        document.querySelectorAll('.updateBtn').forEach(items=> items.addEventListener('click',update_product));
        document.querySelectorAll('.deleteBtn').forEach(items=> items.addEventListener('click',delete_product));
    })
    .catch(err=>console.log(err))
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.setAttribute('id', res._id)
    div.innerHTML=`
    <img src='${res.image}' class='thumbnail'>
    <div class='details'>
        <div class='labels'>
            <label>Name</label>
            <label>Description</label>
            <label>Price</label>
            <label>Quantity</label>
        </div>
        <div class='inputs'>
            <input type='text' id='${res._id}product-name' value='${res.product_name}'>
            <input type='text' id='${res._id}product-desc' value='${res.desc}'>
            <input type='text' id='${res._id}product-price' value='${res.price}'>
            <input type='text' id='${res._id}product-quantity' value='${res.quantity}'>
        </div>
    </div>
    <div class='operations'>
        <button id='${res._id}' class='updateBtn'>UPDATE</button>
        <button id='${res._id}' class='deleteBtn'>DELETE</button>
    </div>`
    display_products.appendChild(div);
}

document.querySelector('#load-moreBtn').addEventListener('click',load_product);

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

function update_product(){
    
    const product_name = document.getElementById(this.id+'product-name').value
    const desc = document.getElementById(this.id+'product-desc').value
    const price = document.getElementById(this.id+'product-price').value
    const quantity = document.getElementById(this.id+'product-quantity').value
    const id= this.id

    const update_product={
        id,
        product_name,
        desc,
        price,
        quantity,
    }
    fetch('/admin/update_product',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update_product)
    })
    .then(res=>{
        return res.json();
    })
    .then(res=>{
        alert(res.message);
    })
    .catch(err=>{
        alert(err);
    })
}

function delete_product(){
    fetch('/admin/delete',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.id})
    })
    .then(res=> res.json())
    .then(res=>{
        alert(res.message)
        if(res.message==='Sucessfully deleted')
            document.getElementById(this.id).remove();
    })
    .catch(err=>{
        alert('An error occured\n view console for more');
        console.log(err);
    })
}


load_product();