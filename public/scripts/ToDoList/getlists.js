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
            throw "You have no categories"
        }
        else{
            console.log("sending");
            drawCategoies(data);
        }
    }
    catch(err){
        console.log(err);
    }
}