var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  addlistcard();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
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
  const checkBox = document.createElement("button");
  const answer = document.createElement('h2');

  listcard.className = 'listcard';

  checkBox.setAttribute("id", "checkbox");  

  
  answer.textContent = text.my_answer;

  
  listcard.appendChild(checkBox)
  listcard.appendChild(answer);

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
  
  const answer = document.querySelector("#answer");

  let listcard_info = {
    
    'my_answer'  : answer.value
  }

  contentArray.push(listcard_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  listcardMaker(contentArray[contentArray.length - 1]);
  answer.value = "";
}