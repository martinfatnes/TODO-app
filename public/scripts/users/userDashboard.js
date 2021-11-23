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

function changePassword(){
    
    btn.addEventListener('click', async function(){
        if(password.value === password2.value){
            const url = "/apu/user/update/password";
            const token = localStorage.getItem('token');
            
            const updata = {
                password: password.value
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
    
                header.innerHTML = data.msg;
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            header.innerHTML = "Type same password";
        }
    })
}