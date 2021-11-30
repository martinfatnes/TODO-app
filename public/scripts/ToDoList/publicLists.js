async function publicLists(){
    const container = document.getElementById('publicContainer');
    const searchbar = document.getElementById("searchbar");
    let tagSearch = [];

        searchbar.addEventListener('keyup', (e) => {
            console.log(e.target.value);
        })

    try{
        const data = await getContentUnderCategory();

        
        for(let category of data[0]){
            const div = document.createElement('div');
            div.className = "listcard";
            const header = document.createElement('h2');
            const publisher = document.createElement('p');
            publisher.innerHTML = `Published by: ${category.username}`;
            header.innerHTML = category.name;
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
            container.appendChild(div);
        }
      }
      div.appendChild(publisher);
      container.appendChild(div);
    }
  } catch (err) {
    console.log(err);
  }
}
