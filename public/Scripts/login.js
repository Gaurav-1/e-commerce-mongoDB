const password = document.querySelector('#password');
const mailid = document.querySelector('#usermail');

function mail(){
    const atposition = mailid.value.indexOf('@');
    const dotposition = mailid.value.lastIndexOf('.')
    if(atposition<1||dotposition<atposition+2||dotposition+2>=mailid.value.length){
        document.querySelector('#mailErr').innerHTML='Enter a valid e-mail address'
        return false;
    }
    document.querySelector('#mailErr').innerHTML=''
}
function pass(){
    if(password.value.length<8){
        document.querySelector('#passErr').innerHTML='Password must be 8 charcter long'
        return false;
    }
    document.querySelector('#passErr').innerHTML=''
}

document.querySelector('#loginBtn').addEventListener('click',(event)=>{
    event.preventDefault();

    if(mail()===false || mailid.value.trim()===''){
        alert('Please enter a correct email id')
        return;
    }
    if(pass()===false || password.value.trim()===''){
        alert('Please enter a correct password')
        return;
    }
    const form = new FormData(document.querySelector('#login_form'));
    const form_data = {}

    form.forEach((element,key)=>{
        form_data[key]=element;
    })

    fetch('/user/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data)
    }).then((res)=>{
        return res.json();
    }).then(res=>{
        if(res.url!==null){
            window.location.href = res.url;
        }
        else{
            alert(res.message)
        }
    })
    .catch(err=>{
        alert(err);
    })
})