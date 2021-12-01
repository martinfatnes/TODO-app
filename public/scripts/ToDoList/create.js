async function createCategory(categryName, public, tag, date) {
  const url = "/api/category";
  const token = localStorage.getItem("token");

  const updata = {
    header: categryName,
    shareStatus: public,
    tag: tag,
    date: date,
  };

  const cfg = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      autorization: token,
    },
    body: JSON.stringify(updata),
  };

  try {
    const respons = await fetch(url, cfg);
    const data = await respons.json();

    if (respons.status != 200) {
      throw "Coult not create";
    } 
    else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

async function createContent(categoryId, content, public) {
  const url = "/api/content";
  const token = localStorage.getItem("token");
  
  const updata = {
    header: categoryId,
    content: content,
    shareStatus: public,
  };

  const cfg = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      autorization: token,
    },
    body: JSON.stringify(updata),
  };

  try {
    const respons = await fetch(url, cfg);
    const data = await respons.json();

    if (respons.status != 200) {
      throw "Coult not create";
    }

    return data.msg;
  } catch (err) {
    console.log(err);
  }
}
