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

async function getContent(categoryId){
    const url = "/api/content/all/" + categoryId;
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
            throw "Category have no related content";
        }

        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getCategoryPublic(){
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

        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function getContentUnderCategory(categoryId){
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
            return data.msg; 
        }
        
        return data;
    }
    catch(err){
        console.log(err);
    }
}


//GET LOCAL CATEGORY
async function getPublicCategory(){
    const url = "api/category/public";
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
            throw "Error stuff";
        }

        return data;
    }
    catch(err){
        console.log(err);
    }
}