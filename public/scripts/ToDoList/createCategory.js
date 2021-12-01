function sortData(a, b){
  if(a.id < b.id){
    return -1
  }
  if(a.id > b.id){
    return 1
  }
  return 0
}

function categoryPage(){
  const view = document.getElementById("categoryView");
  const savebtn = document.getElementById("save");
  const date = document.getElementById("date");

  (async function () {
    getCategory()
    .then(data => data.sort(sortData))
    .then(data => {
      const div = document.createElement("div");
      div.className = "listcard";
      div.innerHTML = `<h2>My categories</h2>`;
      const elm = document.createElement("ul");

      if (data === undefined) {
        elm.innerHTML = "Du har ingen kategorier";
      } else {
        data.forEach((category) => {
          elm.innerHTML +=
           `<li id='${category.id}'><b id="changeName-${category.id}" onClick="createInput('${category.id}')">${category.name}</b>
            <br />- create by ${category.username} is public: ${category.share
               ?
                " <b onclick='changeCategoryShare("+ category.id+", false)'>✔</b> "
                 : "<b onclick='changeCategoryShare("+ category.id+", true)'>❌</b>"}
           <i>#${category.tag}</i><br /><button onclick="removeCategory(${category.id})">DELETE</button></li>`;
        });
      }
      div.appendChild(elm);
      view.appendChild(div);
    });
  })();

  savebtn.addEventListener("click", async () => {
    const name = document.getElementById("input_category_name").value;
    const tag = document.getElementById("input_category_tag").value;
    const ispublic = document.getElementById("is_public").checked;
    try {
      await createCategory(name, ispublic, tag, date.value);
      view.innerHTML =
        '<p style="color:green">Kategoriener lagret! <hr /><button onclick="LoadCategory()">Tilbake</button></p>';
    } catch (error) {
      view.innerHTML = `<p style="color:red">${error} <hr/> <button onclick="LoadCategory()">Tilbake</button></p> `;
    }
  });

 

};

const createInput = id => {
  const nameInput = document.createElement('input')
  nameInput.placeholder = "Category name";
  nameInput.id = "newCategoryName"+id;
  nameInput.addEventListener('keydown', (event) => {
      const enterkey = event.keyCode ==  13
      if(enterkey){
        const name = document.getElementById('newCategoryName'+id).value;
        changeCategoryName(name, id);
      }
  })
  document.getElementById(id+'').appendChild(nameInput)
}

// Remove the category from the view
async function removeCategory(categoryId) {
  const view = document.getElementById("categoryView");

  deleteCategory(categoryId)
    .then((res) => LoadCategory())
    .catch(
      (error) =>
        (view.innerHTML = `<p style="color:red">${error} <hr/> <button onclick="LoadCategory()">Tilbake</button></p>`)
    );
}

async function changeCategoryShare(categoryId, isShare){
 update = {
  categoryId,
  share: isShare
 }

 const cfg = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    autorization: localStorage.getItem("token"),
  },
  body: JSON.stringify(update),
};

 fetch('/api/category/privacy', cfg).then(r => r.json()).then(console.log).finally(() => LoadCategory())
}

async function changeCategoryName(name, categoryId){
  const cfg = {
   method: "POST",
   headers: {
     "content-type": "application/json",
     autorization: localStorage.getItem("token"),
   },
   body: JSON.stringify({categoryId, name}),
 };
 
  fetch('/api/category/name', cfg).then(r => r.json()).then(console.log).finally(() => LoadCategory())
 }