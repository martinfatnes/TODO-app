async function getCategory(){
    const url = "/api/category/all";
    const token = localStorage.getItem('token');

    const cfg = {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "autorization": token
        },
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "You have no categories";
        }
        
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getContent(){
    const url = "/api/content/all";
    const token = localStorage.getItem('token');

    const cfg = {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "autorization": token
        }
    }
    
    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "You have not content";
        }

        console.log(data);
    }
    catch(err){
        console.log(err);
    }
}

async function getCategoryPublic(){
    const container = document.getElementById('public');
    const url = "/api/category/public/";
    const token = localStorage.getItem('token');

    const cfg = {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "autorization": token
        }
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "No public category";
        }  

        for(let value of data){
            const header = document.createElement('h2');
            const publisher = document.createElement('p');
            const div = document.createElement('div');
            const contentDiv = document.createElement('div');
            container.className = "publicList";

            header.innerHTML = value.name;
            publisher.innerHTML = `Published by: ${value.username}`;

            div.appendChild(header);
            div.appendChild(publisher);
            div.appendChild(contentDiv);

            div.addEventListener('click', function(){
                contentDiv.innerHTML = "";
                getContentUnderCategory(value.id, contentDiv);
            })
            
            container.appendChild(div);
        }
    }
    catch(err){
        console.log(err);
    }
}

async function getContentUnderCategory(categoryId, div){
    const url = "/api/content/public/" + categoryId;

    const cfg = {
        method: "GET",
        headers: {
            "content-type":"application/json",
        }
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            return console.log(data.msg); 
        }

        for(let value of data){
            const p = document.createElement('p');
            const contentDiv = document.createElement('div');
            const checkBox = document.createElement('input');

            contentDiv.style.display = "grid";
            contentDiv.style.gridTemplateColumns = "auto auto";
            checkBox.type = "checkbox";
            p.innerHTML = value.content;
            contentDiv.appendChild(p);
            contentDiv.appendChild(checkBox);
            div.appendChild(contentDiv);
        }
    }
    catch(err){
        console.log(err);
    }
}