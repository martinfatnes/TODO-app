async function deleteUser(){
    const url = "/api/user/delete";
    const token = localStorage.getItem('token');

    const cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "autorization": token},
    }

    try{
        const result = await fetch(url, cfg);
        const data = await result.json();

        if(result.status != 200){
            throw data.error;
        }
        else{
            console.log(data.msg);
        }
    }
    catch(err){
        console.log(err);
    }
}