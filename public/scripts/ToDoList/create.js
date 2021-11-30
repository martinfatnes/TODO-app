async function createCategory(categoryName, public, tag, date){
    const url = "/api/category";
    const token = localStorage.getItem('token');
   
    console.log(categoryName, public);

    const updata = {
        header: categoryName,
        shareStatus: public,
        tag: tag,
        date: date
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
            console.log(data.msg);
        }
    }
    catch(err){
        console.log(err);
    }
}

async function createContent(categoryId, content, public){
    const url = "/api/content";
    const token = localStorage.getItem('token');
    const updata = {
        header: categoryId,
        content: content,
        shareStatus: public
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
        refresh();
        return respons.status;
    }
    catch(err){
        console.log(err);
    }
}