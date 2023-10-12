const names =  document.querySelector('#name')
const desc = document.querySelector('#desc')
const price = document.querySelector('#price')
const quantity = document.querySelector('#quantity')
const image = document.querySelector('#image')


function names_chk(){
    if(names.value.trim()==''){
        alert('Please Enter a proper product name');
        return false;
    }
}

function desc_chk(){
    if(desc.value.trim()==''){
        alert('Please enter a proper description');
        return false;
    }
}

function price_chk(){
    if(price.value<5 || price.value.trim()==''){
        alert('Please enter a proper description');
        return false;
    }
}

function quantity_chk(){
    if(quantity.value<5 || quantity.value.trim()==''){
        alert('Please enter a proper description');
        return false;
}}

function image_chk(){
    const img_type=/(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if(image.value=='' || image.files.length<1 || !img_type.exec(image.value) || image.files[0].size<(2*1024*1024)){
        alert('Please select a image with .jpg/.jpeg/.png/.webp\nImage size should be maximun 2MB');
        return false;
}}



document.querySelector('#add-productBtn').addEventListener('click',()=>{
    if(names.value.trim().length<3){
        alert('Product can not be less than 3 character');
        return;
    }
    names_chk()
    desc_chk();
    price_chk();
    quantity_chk();
    image_chk();
    const form_data=new FormData(document.getElementById('product-form'));
    const form = {};
    form_data.forEach((elements,keys)=>{
        form[keys]=elements;
    })
    console.log(form_data);
    fetch('/admin/add_product',{
        method: 'POST',
        body: form_data
    })
    .then(res=>res.json())
    .then(res=>alert(res.message))
    .catch(err=>{
        alert('An Error occured')
        console.log(err)
    })
    names.value=desc.value=price.value=quantity.value=image.value=''
})

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