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

async function getContentUnderCategory(){
    const url = "/api/content/public/";

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
            return data; 
        }
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getContentUnderCategoryUser(){
    const url = "/api/content/all/user";
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
            return {msg: data.msg}; 
        }
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getContentUser(){
    const url = "/api/content/user";
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
            throw "You have not posted yet";
        }

        return data;
    }
    catch(err){
        console.log(err);
    }
}