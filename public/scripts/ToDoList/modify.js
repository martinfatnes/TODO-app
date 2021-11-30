//DELETE FUNCTIONS_____________________________________

async function deleteCategory(id){
    const url = `/api/category/${id}`;
    const token = localStorage.getItem('token');

    const cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "autorization": token
        }
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Coult not delete";
        }
        else{
            console.log(data);
        }
    }
    catch(err){
        console.log(err);
    }
}

async function deleteContent(id){
    const url = "/api/delete/content";
    const token = localStorage.getItem('token');
    
    const updata = {
        id: id
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
            throw "Could not find"
        }

        refresh();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

//UPDATE FUNCTIONS_______________________________
async function updateContent(content, id){
    const url = "/api/updateContent";
    
    const updata = {
        content: content,
        id: id
    }

    const cfg = {
        method: "PUT",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(updata) 
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Could not find"
        }

        refresh();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function updateCompletedItems(id, status){
    const url = "/api/update/complteded";
    
    const updata = {
        id: id,
        status: status
    }

    const cfg = {
        method: "PUT",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(updata) 
    }

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Could not update"
        }

        refresh();
        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function updateTag(id, tag){
  const url = '/api/tags';
  const updata = {
      id: id,
      tag: tag
  }

  const cfg = {
    method: "PUT",
    headers: {
        "content-type":"application/json"
    },
    body: JSON.stringify(updata) 
}

    try{
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        if(respons.status != 200){
            throw "Could not update"
        }

        refresh();
        return data;
    }
    catch(err){
        console.log(err);
    }
}
