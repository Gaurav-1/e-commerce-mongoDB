const display_products = document.querySelector('#display_product');
const popup = document.querySelector('#product-details');
popup.style.visibility = 'hidden'
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
        window.scrollTo(0,display_products.scrollHeight)
        pages+=5;
        document.querySelectorAll('.view-detailsBtn').forEach(items=> items.addEventListener('click',show_popup));
    })
}

function show_products(res){
    const div = document.createElement('div')
    div.setAttribute('class','products')
    div.innerHTML=`
        <img src='${res.image}' class='thumbnail'>
    
    <div class='about'>
        <p class='product-name'>${res.product_name}</p>
        <p>$${res.price}</p>
    </div>
    <button id='${res._id}' class='view-detailsBtn'>View Details</button>`
    display_products.appendChild(div);
}

function show_popup(){
    popup.style.visibility='visible';
    
    let data1 = data.find(item=>item._id===this.id);

    document.querySelector('#product-image').setAttribute('src',data1.image)
    document.querySelector('#product-name').innerHTML = data1.product_name;
    document.querySelector('#product-price').innerHTML = '$ '+data1.price;
    document.querySelector('#product-description').innerHTML = data1.desc;
    document.querySelector('.add-to-cart').setAttribute('id',this.id)
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

document.querySelector('#close-popup').addEventListener('click',()=>{
    popup.style.visibility = 'hidden';
    document.querySelector('#product-image').setAttribute('src','')
    document.querySelector('#product-name').innerHTML = '';
    document.querySelector('#product-price').innerHTML = '';
    document.querySelector('#product-description').innerHTML = '';
})

document.querySelector('.add-to-cart').addEventListener('click',()=>{
    const cart = document.querySelector('.add-to-cart').getAttribute('id');
    console.log(cart);
    fetch('/product/add_cart',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: cart})
    }).then(res=>{
        return res.json()
    }).then(res=>{
        alert(res.message)
    }).catch(err=>{
        console.log(err);
    })
})

load_product();