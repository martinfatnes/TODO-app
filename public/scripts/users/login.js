function loginPage(){
    
    btn.addEventListener('click', async function(){
        const url = '/api/user/login';
        const credString = createCredentialString(username.value, password.value);
        
        const cfg = {
            method: "POST",
            headers: {'authorization': credString}
        }

        try{
            const respons = await fetch(url, cfg);
            const data = await respons.json();

            if(respons.status != 200){
                statusMsg.innerHTML = data.err;
                throw data.err;
            }

            localStorage.setItem('token', data.token);
            header.innerHTML = data.msg;
            dashBoard();
        }
        catch(error){
            console.log(error);
        }
    })
}