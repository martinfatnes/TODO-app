function toDoClient(){
  let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  const items = document.getElementById('items');

  document.getElementById("save_card").addEventListener("click", () => {
    addlistcard();
    createContent(null ,JSON.stringify(contentArray), true);
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
  
  listcardMaker = (text) => {
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
    localStorage.setItem('items', JSON.stringify(contentArray));
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
      li.innerHTML = listcard_info.my_answer;
      items.appendChild(li);
      answer.value = "";
    }
  })
}