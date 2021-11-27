let currentCategory;
let allContent;

async function toDoClient(){
  let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  const items = document.getElementById('items');

  document.getElementById("save_card").addEventListener("click", () => {
    addlistcard();

    if(currentCategory != null){
      createContent(currentCategory, JSON.stringify(contentArray), true);
    }
    else{
      createUnlisted(null ,JSON.stringify(contentArray), true);
    }
    contentArray = [];
  });

  document.getElementById("delete_cards").addEventListener("click", () => {
    localStorage.removeItem("items");
    listcards.innerHTML = '';
    contentArray = [];
  });
  
  document.getElementById("show_card_box").addEventListener("click", () => {
    document.getElementById("create_card").style.display = "block";
  });
  
  document.getElementById("close_card_box").addEventListener("click", () => {
    document.getElementById("create_card").style.display = "none";
  });
  
  listcardMaker = async (text) => {
    const listcard = document.createElement("div");

    listcard.className = 'listcard'; 
    for(let i = 0; i < text.length; i++){
      const answer = document.createElement('h2');
      const checkBox = document.createElement("button");
      checkBox.setAttribute("id", "checkbox"); 
      answer.innerHTML = text[i].my_answer;
      listcard.appendChild(answer);
      listcard.appendChild(checkBox); 
    }

    listcard.addEventListener("click", () => {
      if(answer.style.display == "none")
        answer.style.display = "block";
      else
        answer.style.display = "none";
    })
  
    document.querySelector("#listcards").appendChild(listcard);
  }
  
  contentArray.forEach(listcardMaker);
  
  addlistcard = () => {
    listcardMaker(contentArray);
    answer.value = "";
    items.innerHTML = "";
  }

  const test = document.getElementById('answer');

  test.addEventListener('keydown', function(event){
    const key = event.keyCode;
    if(key === 13){
      let listcard_info = {
        'my_answer'  : answer.value
      }
      contentArray.push(listcard_info);
      const li = document.createElement('li');
      li.innerHTML = answer.value;
      items.appendChild(li);
      answer.value = "";
    }
  })

  displayCategory();
  displayContent();
}

async function displayContent(){
  const card = document.getElementById("listcards");
  card.className = 'listcard';
  try{
    const data = await getContent();
    for(let value of data){
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const btn = document.createElement('button');
      btn.innerHTML = "Delete content";
      h2.innerHTML = value.content;
      div.appendChild(h2);
      div.appendChild(btn);
      card.appendChild(div);

      div.addEventListener('click', function(){
        if(btn.style.display = "block"){
          btn.style.display = "none";
        }
        else{
          btn.style.display = "block";
        }
      })

      btn.addEventListener('click', function(){
        console.log(value.id);
        deleteContent(value.id);
      })
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
  currentCategory = select.value;
}