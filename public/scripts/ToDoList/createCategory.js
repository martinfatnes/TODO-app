const categoryPage = () => {
  const view = document.getElementById("categoryView");
  const savebtn = document.getElementById("save");
  const date = document.getElementById("date");

  (async function () {
    getCategory().then((data) => {
      const div = document.createElement("div");
      div.className = "listcard";
      div.innerHTML = `<h2>My categories</h2>`;
      const elm = document.createElement("ul");

      if (data === undefined) {
        elm.innerHTML = "Du har ingen kategorier";
      } else {
        data.forEach((category) => {
          elm.innerHTML += `<li id='${category.id}'><b>${
            category.name
          }</b> - create by ${category.username} is public: ${
            category.share ? "✔ " : "❌ "
          }
                     <i>#${category.tag}</i>
                    <button onclick="removeCategory(${
                      category.id
                    })">DELETE</button></li>`;
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
      view.innerHTML = `<p style="color:red">${error} <hr/><button onclick="LoadCategory()">Tilbake</button></p> `;
    }
  });
};

// Remove the category from the view
async function removeCategory(categoryId) {
  const view = document.getElementById("categoryView");

  deleteCategory(categoryId)
    .then((res) => LoadCategory())
    .catch(
      (error) =>
        (view.innerHTML = `<p style="color:red">${error} <hr/><button onclick="LoadCategory()">Tilbake</button></p>`)
    );
}

//Set due date
