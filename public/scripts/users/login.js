const mainContainer = document.getElementById("mainContainer");

function loginPage(){
    mainContainer.innerHTML = "";
    const statusMsg = document.createElement('h1');
    const username = document.createElement('input');
    const password = document.createElement('input');
    const btn = document.createElement("button");
    username.placeholder = "Username";
    password.placeholder = "Password";
    password.type = "password";
    username.classList = "userInputs";
    password.classList = "userInputs";
    btn.innerHTML = "Login";
    btn.classList = "userBtns";
    statusMsg.innerHTML = "Hi there!";
    mainContainer.appendChild(statusMsg);
    mainContainer.appendChild(username);
    mainContainer.appendChild(password);
    mainContainer.appendChild(btn);
    
    homePage();

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

            statusMsg.innerHTML = data.msg;

        }
        catch(error){
            console.log(error);
        }
    })
}

loginPage();