async function createCategory(){
    const url = "/api/category";
    const token = localStorage.getItem('token');

    const updata = {
        header: "newasfhjdfskfgdsfasfjds"
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

async function deleteCategory(){
    const url = "/api/delete/category";
    const token = localStorage.getItem('token');

    const updata = {
        name: "newtest5"
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

async function createContent(){
    const url = "/api/content";
    const token = localStorage.getItem('token');

    const updata = {
        header: "newtest5",
        content: "heeeeej"
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