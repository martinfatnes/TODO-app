function homePage(){
    mainContainer.innerHTML = "";
    mainContainer.appendChild(createContentView());
}

function drawCategoies(data){
    
    const header = document.createElement('h2');
    header.innerHTML = data[0].name;
    mainContainer.appendChild(header);
}

function drawButtons(data){
    mainContainer.appendChild(data);
}