function homePage(){
    mainContainer.innerHTML = "";
    getCategory();
}

function drawCategoies(data){
    
    const header = document.createElement('h2');
    header.innerHTML = data[0].name;
    mainContainer.appendChild(header);
}