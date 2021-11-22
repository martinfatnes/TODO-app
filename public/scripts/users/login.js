function loginPage(){
    const div = document.createElement('div');
    div.className = "users";
    const header = createHeader("Login");
    const username = createInput("Username", "userInputs", "text");
    const password = createInput("Password", "userInputs", "password");
    const btn = createButtons("Login", "userBtns");

    div.appendChild(header);
    div.appendChild(username);
    div.appendChild(password);
    div.appendChild(btn);

    fillMainContainer(div);

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
        }
        catch(error){
            console.log(error);
        }
    })
}