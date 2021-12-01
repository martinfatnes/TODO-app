function loginPage() {
  const statusMsg = document.getElementById("statusMsg");
  const btn = document.getElementById("loginBtn");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  btn.addEventListener("click", async function () {
    const url = "/api/user/login";

    //Returns a base64 ASCII string based on username and password + basic (basic username:password)
    const credString = createCredentialString(username.value, password.value);

    const cfg = {
      method: "POST",
      headers: { authorization: credString },
    };

    try {
      const respons = await fetch(url, cfg);
      const data = await respons.json();

      if (respons.status != 200) {
        statusMsg.innerHTML = data.err;
        throw data.err;
      }

      localStorage.setItem("token", data.token);
      statusMsg.innerHTML = data.msg;
      isActive = true;
      LoadCreateToDoItems(); //Loads homepage
    } catch (error) {
      console.log(error);
    }
  });
}
