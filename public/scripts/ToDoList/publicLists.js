async function publicLists(){
    const container = document.getElementById('publicContainer');

    try{
        const data = await getCategoryPublic();
        

        for(let value of data){
            const content = await getContentUnderCategory(value.id);
            const div = document.createElement('div');
            div.className = "contentDiv";
            const header = document.createElement('h2');
            header.innerHTML = value.name;
            const publisher = document.createElement('p');
            publisher.innerHTML = "Published by: " + value.username;
            div.appendChild(header);

            for(let items of content){
                if(items.categoryid === value.id){
                    const p = document.createElement('p');
                    const completed = document.createElement('p');
                    if(items.done){
                        completed.innerHTML = '✔';
                    }
                    p.innerHTML = items.content;
                    div.appendChild(p);
                    div.appendChild(completed);
                }
            }      

            div.appendChild(publisher);
            container.appendChild(div);
        }
    }
    catch(err){
        console.log(err);
    }
}