const usernameInpLog = document.getElementById("usernameLog");
const passwordInpLog = document.getElementById("passwordLog");
const btnLogin = document.getElementById("login");


btnLogin.addEventListener('click', async function(){
    const username = usernameInpLog.value;
    const password = passwordInpLog.value;
    const url = '/api/user/login';
    const credString = createCredentialString(username, password);

    const cfg = {
        method: "POST",
        headers: {'authorization': credString}
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw data.error;
        }

        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
        createCategory();
    }
    catch(err){
        console.log(err);
    }
})