let currentCategory;
function toDoClientAdd(){
  const addList = document.getElementById("save_card");
  const showCard = document.getElementById('show_card_box');
  const closeCardEditor = document.getElementById('close_card_box');
  const textEditor = document.getElementById('create_card');
  const text = document.getElementById('answer');
  const items = document.getElementById('items');
  const dropDown = document.getElementById('selectCategory');
  const checkPublic = document.getElementById('checkPublc');

  async function categorySelector(){
    
    try{
      const data = await getCategory();

      for(let value of data){
        const option = document.createElement('option');
        option.value = value.id;
        option.innerHTML = value.name;
        dropDown.appendChild(option);
      }
      check();
    }
    catch(err){
      console.log(err);
    }
  }

  text.addEventListener('keydown', async function(event){
    const key = event.keyCode;

    if(key === 13){
      try{
        if(checkPublic.checked){
          const data = await createContent(currentCategory, text.value, true);
          items.innerHTML = "";
          outPutToDb = "";
          text.value = "";
          console.log("true");
          if(data != 200){
            throw data;
          }

        }
        else{
          const data = await createContent(currentCategory, text.value, false);
          items.innerHTML = "";
          outPutToDb = "";
          text.value = "";
          if(data != 200){
            throw data;
          }
        }
    }
    catch(err){
      console.log(err);
    }
    }
  })

  showCard.addEventListener('click', function(){
    textEditor.style.display = "block";
  })

  closeCardEditor.addEventListener('click', function(){
    textEditor.style.display = "none";
  })

  categorySelector();
  refresh();
}

async function refresh(){
  const listcards = document.getElementById('listcards');
  listcards.innerHTML = "";

  try{
      const category = await getCategory();
      const content = [];
      for(let value of category){
        const data = await getContent(value.id);
        
        if(data){
          content.push(data);
        }
      }

      for(let i = 0; i < content.length; i++){
        const div = document.createElement('div');
        div.className = "listcard";
        const h2 = document.createElement('h2');
        h2.innerHTML = category[i].name;
        div.appendChild(h2);
        listcards.appendChild(div);
        for(let value of content[i]){
          const divContent = document.createElement('div');
          const p = document.createElement('p');
          const checkbox = document.createElement('input');
          checkbox.type = "checkbox";

          checkbox.addEventListener('change', function(){
            updateCompletedItems(value.id);
          })

          if(value.share){
            p.innerHTML = value.content + " " + "Public";
          }
          else{
            p.innerHTML = value.content + " " + "Private";
          }
          divContent.appendChild(p);
          if(value.done){
            const completed = document.createElement('p');
            completed.innerHTML = "Completed";
            divContent.appendChild(completed);
          }
          else{
            divContent.appendChild(checkbox);
          }
          div.appendChild(divContent);

          divContent.addEventListener('click', function(){
            const edit = document.createElement("input");
            const delteBtn = document.createElement('button');
            delteBtn.innerHTML = "Delte item";
            divContent.appendChild(edit);
            divContent.appendChild(delteBtn);

            delteBtn.addEventListener('click', function(){
              deleteContent(value.id);
            });

            edit.addEventListener('keydown', function(event){
              const key = event.keyCode;
              if(key === 13){
                updateContent(edit.value, value.id);
              }
            })

          })
        }
      }
    }
  catch(err){
    console.log(err);
  }
}

async function displayCategory(){
  const categoryDiv = document.getElementById('category');
  const select = document.getElementById('selectCategory');
  
  try{
    const category = await getCategory();

    for(let value of category){
      const options = document.createElement('option');
      options.value = value.name;
      options.innerHTML = value.name;
      select.appendChild(options)
      categoryDiv.appendChild(select);
    }
    
  }
  catch(err){
    console.log(err);
  }
}

function check(){
  const select = document.getElementById('selectCategory');
  const value = parseInt(select.value);
  currentCategory = value;
}

