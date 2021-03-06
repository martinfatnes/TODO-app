const container = document.getElementById("content");
const loginInfo = document.getElementById('login');
const menu = document.getElementById("menu");
const dashboardItems = document.getElementById("dashboardMenu");

async function refreshContent(url, page){
    container.innerHTML = "";
    if(localStorage.getItem("token")){
        menu.style.display = "grid"; 
        loginInfo.style.display = "none";
    }
    else{
        menu.style.display = "none"; 
        loginInfo.style.display = "grid";
    }

    try{
        const respons = await fetch(url);
        const data = await respons.text();
        const parser = new DOMParser();
        const contentDiv = parser.parseFromString(data, "text/html");
        divBody = contentDiv.querySelector('div');
        container.appendChild(divBody);
        page();
    }
    catch(err){
        console.error(err);
    }
}

function LoadCategory(){
    refreshContent(CRATE_CATEGORY, categoryPage);
}

function LoadLoginPage(){
    refreshContent(LOGIN, loginPage);
}

function LoadDashboard(){
    refreshContent(DASHBOARD, dashBoard);
}

function LoadCreateUser(){
    refreshContent(SIGNUP, createUserPage);
}

function LoadCreateToDoItems(){
    refreshContent(MYTODOS, TextEditor);
}

function LoadPublic(){
    refreshContent(PUBLIC, getPublicLists);
}

function LogOut(){
    localStorage.removeItem("token");
    LoadLoginPage();
}

function callapsItems(){
    if(dashboardItems.style.display === "grid"){
        dashboardItems.style.display = "none";
    }
    else{
        dashboardItems.style.display = "grid";
    }
}

window.onload = function(){
    if(localStorage.getItem("token")){
        LoadCreateToDoItems();
    }
    else{
        LoadLoginPage();
    }
}