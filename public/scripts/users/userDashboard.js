function dashBoard(){
    const formBtn = document.getElementById("formBtn");
    const form = document.getElementById("form");
    const password = document.getElementById('password');
    const securityPassword = document.getElementById("securityPassword");

    const changePasswordBtn = document.getElementById("submit");

    changePasswordBtn.addEventListener('click', function(){
        changePassword(password.value, securityPassword.value);
    })

    formBtn.addEventListener('click', function(){
        if(form.style.display === "none"){
            form.style.display = "grid";
        }
        else{
            form.style.display = "none";
        }
    })
}

async function deleteUser(){
    const url = "/api/user/delete";
    const token = localStorage.getItem('token');

    const cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "autorization": token},
    }

    try{
        const result = await fetch(url, cfg);
        const data = await result.json();

        if(result.status != 200){
            throw data.error;
        }
        else{
            console.log(data.msg);
        }
    }
    catch(err){
        console.log(err);
    }
}

async function changePassword(password, securityPassword){
    const statusMsg = document.getElementById('formBtn');
    if(password === securityPassword){
        const url = "/apu/user/update/password";
        const token = localStorage.getItem('token');
        
        const updata = {
            password: password
        }
    
        const cfg = {
            method: "PUT",
            headers: {
                "content-type":"application/json",
                "autorization": token},
            body: JSON.stringify(updata)
        }
    
        try{
            const result = await fetch(url, cfg);
            const data = await result.json();
    
            if(result.status != 200){
                throw data.err;
            }
            statusMsg.innerHTML = data.msg;
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        console.log("type same value");
    }
}