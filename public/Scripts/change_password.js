
const pass = document.querySelector('#new-password');
const conf_pass = document.querySelector('#confirm-new-password');

function validatePassword(password) {
  const hasDigit = /\d/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  const noWhitespace = !/\s/.test(password);
  const validLength = password.length >= 8 && password.length <= 15;

  return {
    hasDigit,
    hasLowercase,
    hasUppercase,
    hasSpecialChar,
    noWhitespace,
    validLength,
  };
}

function change_color(id,color){
        document.getElementById(id).style.color = color
}

function passvalid(){
    const passChk = validatePassword(pass.value)

    if(passChk.hasDigit)
        change_color('Dcase', 'green')
    else
        change_color('Dcase', 'red')
    if(passChk.hasLowercase)
        change_color('Lcase', 'green')
    else
        change_color('Lcase', 'red')
    if(passChk.hasSpecialChar)
        change_color('Scase', 'green')
    else
        change_color('Scase', 'red')
    if(passChk.hasUppercase)
        change_color('Ucase', 'green')
    else
        change_color('Ucase', 'red')
    if(passChk.validLength)
        change_color('8char', 'green')
    else
        change_color('8char', 'red')
    if(passChk.noWhitespace)
        change_color('Wcase','green')
    else
        change_color('Wcase', 'red')
}

function confpass(){
    if(conf_pass.value === pass.value)
        document.getElementById('matchErr').innerHTML = ""
    else{
        document.getElementById('matchErr').innerHTML = "Password doesn't match"
        return false;
    }
}

document.querySelector('#change-passBtn').addEventListener('click',()=>{

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(pass.value.trim()==='' || conf_pass.value.trim()===''){
        alert('Password and Confirm password required');
        return;
    }
    if(!regex.test(pass.value)){
        alert("Password doesn't pass the validation check")
        return;
    }
    if(confpass()===false){
        alert("Password doesn't match Confirm password");
        return;
    }
    const myUrl = new URL(window.location.toLocaleString());
    fetch(myUrl.pathname,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: pass.value
        })
    }).then(res=>{
            return res.json();
    }).then(res=>{
        alert(res.message)
    })
    .catch(err=>{
        alert(err.message)
    })

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