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
            if(respons.status === 404){
                
            }   
            else{
                throw "You have no categories";
            }
        }
        else{
            
        }
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