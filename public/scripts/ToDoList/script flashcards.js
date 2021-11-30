let currentCategory;

function createCategoryHeader() {
  const categoryname = document.getElementById("categoryname");
  const checkPublic = document.getElementById("checkPublc");

  categoryname.addEventListener("keydown", async function (event) {
    const key = event.keyCode;
    if (key === 13) {
      try {
        if (checkPublic.checked) {
          await createCategory(categoryname.value, true);
          categorySelector();
        } else {
          await createCategory(categoryname.value, false);
          categorySelector();
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}

async function categorySelector() {
  const dropDown = document.getElementById("selectCategory");
  try {
    const data = await getContentUnderCategoryUser();
    const test = data[0].reverse();

    for (let value of data[0]) {
      const option = document.createElement("option");
      option.value = value.id;
      option.innerHTML = value.name;
      dropDown.appendChild(option);
    }
    check();
  } catch (err) {
    console.log(err);
  }
}

function toDoClientAdd() {
  const addList = document.getElementById("save_card");
  const showCard = document.getElementById("show_card_box");
  const closeCardEditor = document.getElementById("close_card_box");
  const textEditor = document.getElementById("create_card");
  const text = document.getElementById("answer");
  const items = document.getElementById("items");
  const checkPublic = document.getElementById("checkPublc");

  text.addEventListener("keydown", async function (event) {
    const key = event.keyCode;

    if (key === 13) {
      try {
        if (checkPublic.checked) {
          const data = await createContent(currentCategory, text.value, true);
          items.innerHTML = "";
          outPutToDb = "";
          text.value = "";
          console.log("true");
          if (data != 200) {
            throw data;
          }
        } else {
          const data = await createContent(currentCategory, text.value, false);
          items.innerHTML = "";
          outPutToDb = "";
          text.value = "";
          if (data != 200) {
            throw data;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  showCard.addEventListener("click", function () {
    textEditor.style.display = "block";
  });

  closeCardEditor.addEventListener("click", function () {
    textEditor.style.display = "none";
  });

  categorySelector();
  createCategoryHeader();
  refresh();
}

async function refresh() {
  const listcards = document.getElementById("listcards");
  listcards.innerHTML = "";

  try {
    const data = await getContentUnderCategoryUser();
    if (!data.msg) {
      for (let value of data[0]) {
        const div = document.createElement("div");
        div.className = "listcard";
        const h2 = document.createElement("h2");
        h2.innerHTML = `${value.name} -  <i>#${value.tag}</i>`;
        div.appendChild(h2);
        listcards.appendChild(div);
        for (let items of data[1]) {
          if (value.id === items.categoryid) {
            const divContent = document.createElement("div");
            divContent.className = "contentDiv";
            const p = document.createElement("p");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            checkbox.addEventListener("change", function () {
              updateCompletedItems(items.id, items.done);
            });

            if (items.share) {
              p.innerHTML = items.content;
            } else {
              p.innerHTML = items.content;
            }
            divContent.appendChild(p);
            if (items.done) {
              const completed = document.createElement("p");
              completed.innerHTML = "✔";

              completed.addEventListener("click", function () {
                updateCompletedItems(items.id, items.done);
              });

              divContent.appendChild(completed);
            } else {
              divContent.appendChild(checkbox);
            }
            div.appendChild(divContent);

            const edit = document.createElement("input");
            const delteBtn = document.createElement("button");
            delteBtn.innerHTML = "Delte item";
            delteBtn.style.display = "none";
            edit.style.display = "none";
            divContent.appendChild(edit);
            divContent.appendChild(delteBtn);

            p.addEventListener("click", function () {
              if (delteBtn.style.display === "none") {
                delteBtn.style.display = "block";
              } else {
                delteBtn.style.display = "none";
              }

              if (edit.style.display === "none") {
                edit.style.display = "block";
              } else {
                edit.style.display = "none";
              }
            });

            delteBtn.addEventListener("click", function () {
              deleteContent(items.id);
            });

            edit.addEventListener("keydown", function (event) {
              const key = event.keyCode;
              if (key === 13) {
                updateContent(edit.value, items.id);
              }
            });
            console.log(value);
          }
        }
        const dateP = document.createElement("p");
        const outdte = new Date(value.date);
        dateP.innerHTML = `${outdte.getDate()}.${outdte.toLocaleString(
          "en-US",
          { month: "long" }
        )}.${outdte.getFullYear()}`;

        div.appendChild(dateP);
        console.log(outdte.toLocaleString("en-US", { month: "long" }));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function check() {
  const select = document.getElementById("selectCategory");
  const value = parseInt(select.value);
  currentCategory = value;
}
