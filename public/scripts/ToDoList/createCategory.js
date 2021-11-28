const categoryPage = () => {
    const view = document.getElementById('categoryView');
    const savebtn = document.getElementById('save');

    (async function(){
        const data = await getCategory();

        const elm = document.createElement('ul')

        data.forEach(category => {
            elm.innerHTML+= `<li><b>${category.name}</b> - create by ${category.username} is public: ${category.share ? '✔': '❌'} </li>`
        });
        view.appendChild(elm);
    }())

    savebtn.addEventListener('click', ()=> {
        const name = document.getElementById('input_category_name').value;
        const ispublic = document.getElementById('is_public').checked
        try {
            createCategory(name, ispublic); 
            view.innerHTML = '<p style="color:green">Kategoriener lagret!</p>';  
        } catch (error) {
            view.innerHTML = `<p style="color:red">${error}</p> ` 
        }
    })    

}

