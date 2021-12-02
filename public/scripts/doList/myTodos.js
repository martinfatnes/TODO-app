let currentCategory;
function TextEditor(){
    const showCard = document.getElementById("show_card_box");
    const textEditor = document.getElementById("create_card");
    const text = document.getElementById("answer");
    const categoryname = document.getElementById("categoryname");

    showCard.addEventListener("click", function () {
        if(textEditor.style.display === "grid"){
            textEditor.style.display = "none";
        }
        else{
            textEditor.style.display = "grid";
        }
    });

    categoryname.addEventListener("keyup", async function (event) {
        const key = event.keyCode;
        const checkPublic = document.getElementById("checkPublc");
        if (key === 13) {
            try{
                await createCategory(categoryname.value, checkPublic.checked);
                categoryname.value = "";
                refreshDropDown();
            }
            catch(err){
                console.log(err);
            }
        }
    });

    text.addEventListener("keyup", async function (event) {
        const key = event.keyCode;
        
        if (key === 13) {
            try {
                await createContent(currentCategory, text.value, true);
                items.innerHTML = "";
                outPutToDb = "";
                text.value = "";
                refreshPageContent();
            } catch (err) {
                console.log(err);
            }
        }
    });
    refreshDropDown();
}

//_____________________________DROPDOWNMENU_____________________________//

function dropDown(data){
    const dropDown = document.getElementById("selectCategory");
    dropDown.innerHTML = "";
    
    for (let value of data) {
        const option = document.createElement("option");
        option.value = value.id;
        option.innerHTML = value.name;
        dropDown.appendChild(option);
    }

    if(!currentCategory){
        currentCategory = dropDown.value;
    }

    dropDown.addEventListener('change', function(){
        currentCategory = dropDown.value;
    })
}

function outPutContent(data){
    const listcards = document.getElementById("listcards");
    listcards.innerHTML = "";

    for(let category of data[0]){
        //Info about the todo List
        const div = document.createElement('div');
        const editBtn = document.createElement('button');
        editBtn.innerHTML = "Edit card";
        div.className = "listcard";
        const categoryHeader = document.createElement('h2');
        const date = document.createElement('p');
        const tag = document.createElement('p');
        const convertToDate = new Date(category.date);
        categoryHeader.innerHTML = category.name;
        tag.innerHTML = category.tag;
        date.innerHTML = category.date;

        div.appendChild(categoryHeader);

        for(let content of data[1]){
            if(category.id === content.categoryid){
                const contentDiv = document.createElement('div');
                const completed = document.createElement('p');
                completed.className = "checkbox";
                completed.innerHTML = "✔";

                completed.className = "cursorChange";

                contentDiv.className = "contentDiv";
                const p = document.createElement('p');
                const checkbox = document.createElement('input');
                checkbox.className = "cursorChange";
                checkbox.type = "checkbox";
        
                checkbox.addEventListener('change', async function(){
                    try{
                        await updateCompletedItems(content.id, true);
                        refreshPageContent();
                    }
                    catch(err){
                        console.log(err);
                    }
                });

                completed.addEventListener('click', async function(){
                    try{
                        await updateCompletedItems(content.id, false);
                        refreshPageContent();
                    }
                    catch(err){
                        console.log(err);
                    }
                })
                
                p.innerHTML = content.content;
                contentDiv.appendChild(p);
                if(content.done){
                    contentDiv.appendChild(completed);
                }
                else{
                    contentDiv.appendChild(checkbox);
                }
                div.appendChild(contentDiv);

                p.addEventListener('click', function(){
                    const inputField = document.createElement('input');
                    const delteItemBtn = document.createElement('button');
                    const modifyDiv = document.createElement('div');
                    modifyDiv.className = "modifyItem";
                    if(contentDiv.children[2]){
                        contentDiv.removeChild(contentDiv.children[2]);
                    }
                    else{
                        inputField.placeholder = content.content;
                        delteItemBtn.innerHTML = "Delte item";
                        modifyDiv.appendChild(inputField);
                        modifyDiv.appendChild(delteItemBtn);
                        contentDiv.appendChild(modifyDiv);

                        delteItemBtn.addEventListener('click', async function(){
                            await deleteContent(content.id);
                            refreshPageContent();
                        })

                        inputField.addEventListener('keydown', async function(event){
                            const key = event.keyCode;

                            if(key === 13){
                                try{
                                    await updateContent(inputField.value, content.id);
                                    refreshPageContent();
                                }
                                catch(err){
                                    console.log(err);
                                }
                            }
                        })
                    }
                })
            }
        }

        date.innerHTML = `${convertToDate.getDate()}.${convertToDate.toLocaleString(
          "en-US",
          { month: "long" }
        )}.${convertToDate.getFullYear()}`;

        editBtn.addEventListener('click', function(){
            editTodoCard(category);
        })

        if(category.date != null){
            if(TODAY.getDate() === new Date(category.date).getDate()){
                const endMessage = document.createElement('h1');
                endMessage.innerHTML = "List expires today!";
                div.appendChild(endMessage);
            }
            else if(TODAY > new Date(category.date)){
                const Overdue = document.createElement('h1');
                const deleteBtn = document.createElement('button');
                deleteBtn.id = "delBtn";
                deleteBtn.innerHTML = "Delete list";
                Overdue.innerHTML = "List is over due ❌";
                deleteBtn.addEventListener('click', function(){
                    deleteCategory(category.id);
                    refreshPageContent();
                })
                div.appendChild(Overdue);
                div.appendChild(deleteBtn);
            }
    
            div.appendChild(date);
        }
        div.appendChild(tag);
        div.appendChild(editBtn);
        listcards.appendChild(div);
    }
}

async function refreshDropDown(){
    try{
        const data = await getCategory();
        dropDown(data);
        refreshPageContent();
    }
    catch(err){
        console.log(err);
    }
}

async function refreshPageContent(){
    try{
        const data = await getContentUnderCategoryUser();
        outPutContent(data);
    }catch(err){
        console.log(err);
    }
}


function editTodoCard(cardInfo){
    listcards.innerHTML = "";
    const submit = document.createElement('button');
    submit.innerHTML = "Submit changes";
    const div = document.createElement('div');
    div.className = "editItem";
    const cardHeader = document.createElement('input');
    cardHeader.type = "text";
    cardHeader.placeholder = "Header";
    const label = document.createElement('label');
    label.innerHTML = "Public";
    const public = document.createElement('input');
    public.type = "checkbox";
    const tag = document.createElement('input');
    tag.type = "text";
    tag.placeholder = "Tag";
    const date = document.createElement('input');
    date.type = "date";
    date.placeholder = "Date";
    date.innerHTML = cardInfo.date;
    tag.innerHTML = cardInfo.tag;
    cardHeader.innerHTML = cardInfo.name;

    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.appendChild(label);
    checkBoxDiv.appendChild(public);

    div.appendChild(cardHeader);
    div.appendChild(checkBoxDiv);
    div.appendChild(tag);
    div.appendChild(date);
    div.appendChild(submit);
    listcards.appendChild(div);

    submit.addEventListener('click', function(){
        UpdateListFunction(cardHeader.value, public.checked, tag.value, date.value, cardInfo.id);
    })
}

async function UpdateListFunction(header, public, tag, date, id){
    try{
        await updateCategory(header, public, tag, date, id);
        refreshPageContent();
    }catch(err){
        console.log(err);
    }
}