function createUserPage(){
    const div = document.createElement('div');
    div.className = "users";
    const header = createHeader("Create user");
    const username = createInput("Username", "userInputs", "text");
    const password = createInput("Password", "userInputs", "password");
    const btn = createButtons("Submit", "userBtns");

    div.appendChild(header);
    div.appendChild(username);
    div.appendChild(password);
    div.appendChild(btn);

    fillMainContainer(div);

    btn.addEventListener('click', async function(){
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
    })
}

function createCredentialString(username, password){
    const comindStr = username + ":" + password;
    const b64String = btoa(comindStr);

    return 'basic ' + b64String;
}