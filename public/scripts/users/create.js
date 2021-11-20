function createUserPage(){
    mainContainer.innerHTML = "";
    const statusMsg = document.createElement('h1');
    const username = document.createElement('input');
    const password = document.createElement('input');
    const btn = document.createElement("button");
    username.placeholder = "Username";
    password.placeholder = "Password";
    username.classList = "userInputs";
    password.classList = "userInputs";
    password.type = "password";
    btn.innerHTML = "Create";
    btn.classList = "userBtns";
    statusMsg.innerHTML = "Create a new user!";
    mainContainer.appendChild(statusMsg);
    mainContainer.appendChild(username);
    mainContainer.appendChild(password);
    mainContainer.appendChild(btn);

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
                statusMsg.innerHTML = data.err;
                throw data.err;
            }

            loginPage();
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