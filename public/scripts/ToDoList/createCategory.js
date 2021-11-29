const categoryPage = () => {
    const view = document.getElementById('categoryView');
    const savebtn = document.getElementById('save');

    (async function(){
        getCategory()
        .then(data => {
            const elm = document.createElement('ul')
            
            if(data === undefined){
                elm.innerHTML = 'Du har ingen kategorier'
            }else{
                data.forEach(category => {
                    elm.innerHTML +=
                     `<li id='${category.id}'><b>${category.name}</b> - create by ${category.username} is public: ${category.share ? '✔ ': '❌ '}
                    <button onclick="removeCategory(${category.id})">DELETE</button></li>`
                });
            }
            view.appendChild(elm);
        })
   
    }())

    savebtn.addEventListener('click', async ()=> {
        const name = document.getElementById('input_category_name').value;
        const ispublic = document.getElementById('is_public').checked
        try {
            await createCategory(name, ispublic); 
            view.innerHTML = '<p style="color:green">Kategoriener lagret! <hr /><button onclick="LoadCategory()">Tilbake</button></p>';  
        } catch (error) {
            view.innerHTML = `<p style="color:red">${error} <hr/><button onclick="LoadCategory()">Tilbake</button></p> ` 
        }
    })  
    
}

 // Remove the category from the view
 async function removeCategory(categoryId){
    const view = document.getElementById('categoryView');

    deleteCategory(categoryId)
    .then(res =>  view.innerHTML = `<p style="color:green">Categorien er slette <hr/><button onclick="LoadCategory()">Tilbake</button></p>`)
    .catch(error => view.innerHTML= `<p style="color:red">${error} <hr/><button onclick="LoadCategory()">Tilbake</button></p>`)
}
