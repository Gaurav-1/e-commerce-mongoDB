const mails = document.querySelector('#usermail');

document.querySelector('#forget-passBtn').addEventListener('click',()=>{

    if(mails.value.trim()==='' || mail()===false){
        alert('Please enter a mail address');
        return;
    }

    fetch('/user/forget_password',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mail: mails.value})
    }).then((res)=>{
        return res.json();
    }).then(res=>{
        alert(res.message);
    }).catch(err=>{
        alert(err);
    })
})

function mail(){
    const regex = /^[a-zA-Z0-9._%-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!.*\s)$/;
    if(!regex.test(mails.value)){
        document.querySelector('#mailErr').innerHTML='Enter a valid e-mail address'
        return false;
    }
    document.querySelector('#mailErr').innerHTML=''
}