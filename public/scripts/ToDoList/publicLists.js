/*
async function djkjsdkds(){
    try{
        const data = await getContentUnderCategory();
        const searchbar = document.getElementById("searchbar");
        let tagSearch = [];

        for(let value of data[0]){
            tagSearch.push(value.tag);
        }
    
        searchbar.addEventListener('keyup', (e) => {
                const searchString = e.target.value;
                const filteredTags = tagSearch.filter( category =>{
                return category.includes(searchString);
            });
                test(data, filteredTags);
        });
        test(data);
    }
    catch(err){
        console.log(err);
    }
}

function test(data, filter){
    for(let value of data[0]){
        const filterwords = filter.filter(tags => {
            if(tags.includes(value.tag)){
                return value;
            }
        })
        console.log(filterwords);
    }
}

______________________________________________________*/
async function publicLists(){
    const container = document.getElementById('publicContainer');
    const searchbar = document.getElementById("searchbar");
    let tagSearch = [];

    
    searchbar.addEventListener('keyup', (e) => {
            const searchString = e.target.value;
            const filteredTags = tagSearch.filter( category =>{
            return category.includes(searchString);
        });
            console.log(filteredTags);
    });
    

    try{
        const data = await getContentUnderCategory();
        
        for(let category of data[0]){
            tagSearch.push(category.tag);
            console.log(tagSearch);
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
                    divContent.className = "contentDiv";
                    const check = document.createElement('p');
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
        div.appendChild(publisher);
        container.appendChild(div);
      }
    catch (err) {
    console.log(err);
    }
}
