function logar() {
  const mail = document.getElementById("login-mail").value.trim();

  if (!mail || mail.length == 0) {
    document.getElementsByClassName("errormsg")[0].innerText = "Por favor, insira um e-mail para logar.";
    document.getElementsByClassName("errormsg")[0].style.display = "flex";
  } else {
    document.getElementsByClassName("errormsg")[0].style.display = "none";
    const usuario = { mail };

    // Configuração da requisição
    const url = `${urlbase}/login`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    };

    // Submete a requisição
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          alert("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        if (data.idusuario) {
          salvarLogin(data);
          window.location.href = "./inicio.html";
        }
        else{
          alert(data.erro);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}

// Salvar dados de login
function salvarLogin(objeto) {
  // JSON.stringify() é usado para converter de objeto JS em string JSON
  localStorage.setItem("usuario", JSON.stringify(objeto));
}
