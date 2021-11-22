const mainContainer = document.getElementById("mainContainer");
const navBar = document.getElementById('sidebar');
let previous;

function fillMainContainer(div){
    mainContainer.innerHTML = "";
    mainContainer.appendChild(div);
}

function startPage(){
    const div = document.createElement('div');
    div.className = "startPage";
    const header = createHeader("Welcome", "");
    const login = createButtons("Login", "loginBtn");
    const signup = createButtons("Signup", "loginBtn");

    login.addEventListener('click', function(){
        loginPage();
    })

    signup.addEventListener('click', function(){
        createUserPage();
    })

    div.appendChild(header);
    div.appendChild(login);
    div.appendChild(signup);
    previous = div;
    return fillMainContainer(div);
}

function prevPage(){
    fillMainContainer(previous);
}

window.onload = function(){
    startPage();
}