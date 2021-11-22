
function createLoginButtons(){
    const inputCategory = document.createElement("input");
    inputCategory.placeholder = "Category name";
    const btn = document.createElement("button");
    btn.innerHTML = "Create category";
    const div = document.createElement("div");
    div.appendChild(inputCategory);
    div.appendChild(btn);

    btn.addEventListener('click', function(){
        if(inputCategory.value != ""){
            createCategory(inputCategory.value);
        }
    })

    return div;
}

function createContentView(){
    const categoryName = document.createElement("input");
    categoryName.placeholder = "Category name";
    const contentInput = document.createElement("input");
    contentInput.placeholder = "Write some contentt";
    const btn = document.createElement("button");
    btn.innerHTML = "Create category";
    const div = document.createElement("div");
    div.appendChild(categoryName);
    div.appendChild(contentInput);
    div.appendChild(btn);

    btn.addEventListener('click', function(){
        if(categoryName.value != ""){
            createContent(categoryName.value, contentInput.value);
        }   
    })

    return div;
}