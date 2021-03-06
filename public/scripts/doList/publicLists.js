function publicLists(data, filter){
    const container = document.getElementById('publicContainer');
    container.innerHTML = "";
        
    for(let category of data[0]){
        if(filter){
            for(let fil of filter){
                if(fil === category.tag){
                    const div = document.createElement('div');
                    div.className = "listcard";
                    const header = document.createElement('h2');
                    const tagParagraph = document.createElement('p');
                    const publisher = document.createElement('p');
                    publisher.innerHTML = `Published by: ${category.username}`;
                    header.innerHTML = category.name;
                    tagParagraph.innerHTML += "#" + category.tag;
                    div.appendChild(header);
                        
                    for(let items of data[1]){
                        if(category.id === items.categoryid){
                            const p = document.createElement('p');
                            const divContent = document.createElement('div');
                            divContent.className = "publicDiv";
                            const check = document.createElement('p');
                            check.className = "checkbox";
                            if(items.done === true){
                                check.innerHTML = "✔";
                            }
                            p.innerHTML = items.content;
                            divContent.appendChild(p);
                            divContent.appendChild(check);
                            div.appendChild(divContent);
                        }
                    }
                    div.appendChild(publisher);
                    div.appendChild(tagParagraph);
                    container.appendChild(div);
                }
            }
        }
        else{
            const div = document.createElement('div');
            div.className = "listcard";
            const header = document.createElement('h2');
            const tagParagraph = document.createElement('p');
            const publisher = document.createElement('p');
            publisher.innerHTML = `Published by: ${category.username}`;
            header.innerHTML = category.name;
            tagParagraph.innerHTML += "#" + category.tag;
            div.appendChild(header);
                
            for(let items of data[1]){
                if(category.id === items.categoryid){
                    const p = document.createElement('p');
                    const divContent = document.createElement('div');
                    divContent.className = "publicDiv";
                    const check = document.createElement('p');
                    check.className = "checkbox";
                    if(items.done === true){
                        check.innerHTML = "✔";
                    }
                    p.innerHTML = items.content;
                    divContent.appendChild(p);
                    divContent.appendChild(check);
                    div.appendChild(divContent);
                }
            }
            div.appendChild(publisher);
            div.appendChild(tagParagraph);
            container.appendChild(div);
        }
    }
}

//-----------------------------

async function getPublicLists(){
    try{
        const data = await getContentUnderCategory();
        publicLists(data);
        searchForTags(data);
    }
    catch(err){
        console.log(err);
    }
}

function searchForTags(data){
    const searchbar = document.getElementById("searchbar");
    const tagSearch = [];

    for(let value of data[0]){
        if(value.tag != null){
            tagSearch.push(value.tag);
        }
    }

    searchbar.addEventListener('keyup', (e) => {
            const searchString = e.target.value;
            const filteredTags = tagSearch.filter( category =>{
            return category.includes(searchString);
        });
        
        for(let filter of filteredTags){
            for(let value of data[0]){
                if(filter === value.tag){
                    publicLists(data, filteredTags);
                }
            }
        }
    });
}