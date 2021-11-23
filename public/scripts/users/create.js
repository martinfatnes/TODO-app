function createUserPage(){
    
    btn.addEventListener('click', async function(){
        if(password.value === password2.value){
            const url = "/api/createUser";
            const credString = createCredentialString(username.value, password.value);
    
            const cfg = {
                method: "POST",
                headers: {'authorization':credString}
            }
    
            try{
                const respons = await fetch(url, cfg);
                const data = await respons.json();
    
                if(respons.status != 200){
                    header.innerHTML = data.err;
                    throw data.err;
                }
    
                header.innerHTML = data.msg;
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            header.innerHTML = "Inpu fields have to be the same";
        }
    })
}

function createCredentialString(username, password){
    const comindStr = username + ":" + password;
    const b64String = btoa(comindStr);

    return 'basic ' + b64String;
}