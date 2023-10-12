
function logout(){
    fetch('/user/logout',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export {logout};