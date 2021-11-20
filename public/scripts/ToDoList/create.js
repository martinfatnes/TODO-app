async function createCategory(categoryName){
    const url = "/api/category";
    const token = localStorage.getItem('token');

    const updata = {
        header: categoryName
    }

    const cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "autorization": token
        },
        body: JSON.stringify(updata)
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Coult not create";
        }
        else{
            console.log(data);
            deleteCategory();
        }
    }
    catch(err){
        console.log(err);
    }
}

async function deleteCategory(categoryName){
    const url = "/api/delete/category";
    const token = localStorage.getItem('token');

    const updata = {
        name: categoryName
    }

    const cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "autorization": token
        },
        body: JSON.stringify(updata)
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Coult not create";
        }
        else{
            console.log(data);
        }
    }
    catch(err){
        console.log(err);
    }
}

async function createContent(categoryName, content){
    const url = "/api/content";
    const token = localStorage.getItem('token');

    const updata = {
        header: categoryName,
        content: content
    }

    const cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "autorization": token
        },
        body: JSON.stringify(updata)
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Coult not create";
        }
        else{
            console.log(data);
        }
    }
    catch(err){
        console.log(err);
    }
}