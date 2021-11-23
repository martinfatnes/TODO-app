const container = document.getElementById("content");

async function refreshContent(url){
    try{
        const respons = await fetch(url);
        const data = await respons.text();
        const parser = new DOMParser();
        const contentDiv = parser.parseFromString(data, "text/html");

        return contentDiv.querySelector('div');
    }
    catch(err){
        console.error(err);
    }
}

async function fillMain(url){
    container.innerHTML = "";
    try{
        const respons = await refreshContent(url);
        container.appendChild(respons);
    }
    catch(err){
        console.error(err);
    }
}

function LoadLoginPage(){
    fillMain(LOGIN);
}

function LoadDashboard(){
    fillMain(DASHBOARD);
}

function LoadCreateUser(){
    fillMain(SIGNUP);
}

function LoadHomepage(){
    fillMain(HOMEPAGE);
}