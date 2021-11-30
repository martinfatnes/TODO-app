function createUserPage() {
  const statusMsg = document.getElementById("statusMsg");
  const btn = document.getElementById("submit");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const securityPassword = document.getElementById("securityPassword");

  btn.addEventListener("click", async function () {
    if (password.value === securityPassword.value) {
      const url = "/api/createUser";
      const credString = createCredentialString(username.value, password.value);

      const cfg = {
        method: "POST",
        headers: { authorization: credString },
      };

      try {
        const respons = await fetch(url, cfg);
        const data = await respons.json();

        location.href = "/view/login.html";

        if (respons.status != 200) {
          statusMsg.innerHTML = data.err;
          throw data.err;
        }
        statusMsg.innerHTML = data.msg;
      } catch (err) {
        console.log(err);
      }
    } else {
      statusMsg.innerHTML = "Inpu fields have to be the same";
    }
  });
}

function createCredentialString(username, password) {
  const comindStr = username + ":" + password;

  //Creates a base64 ACII string
  const b64String = btoa(comindStr);

  //Returns base64 string + basic (basic base64)
  return "basic " + b64String;
}
