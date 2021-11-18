const usernameInp = document.getElementById("username");
const passwordInp = document.getElementById("password");
const btn = document.getElementById("create");

btn.addEventListener('click', async function(){
    const username = usernameInp.value;
    const password = passwordInp.value;

    const url = "/api/createUser";
    const credString = createCredentialString(username, password);

    const cfg = {
        method: "POST",
        headers: {'authorization':credString}
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw data.error;
        }
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
})

function createCredentialString(username, password){
    const comindStr = username + ":" + password;
    const b64String = btoa(comindStr);

    return 'basic ' + b64String;
}
