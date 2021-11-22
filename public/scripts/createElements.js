function createButtons(name, className){
    const btn = document.createElement('button');
    btn.innerHTML = name;
    btn.className = className;

    return btn;
}

function createInput(placeholder, className, type){
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.type = type;
    if(className){
        input.className = className;
    }
    return input;
}

function createHeader(name, className){
    const h1 = document.createElement('h1');
    h1.innerHTML = name;

    if(className){
        h1.className = className;
    }
    return h1;
}