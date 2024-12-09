function criar() {
  const quantidade = parseInt(document.getElementById("quant").value);
  const resultadosDiv = document.getElementById("resultados");

  if (isNaN(quantidade) || quantidade <= 0) {
    resultadosDiv.innerHTML =
      "<p>Por favor, insira um número válido de perfis.</p>";
    return;
  }

  resultadosDiv.innerHTML = "<p>Carregando perfis...</p>";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://randomuser.me/api/?results=" + quantidade);
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        resultadosDiv.innerHTML = "";
        data.results.forEach((perfil) => {
          const perfilDiv = document.createElement("div");
          perfilDiv.classList.add("perfil");
          perfilDiv.innerHTML = `
            <img src="${perfil.picture.large}" alt="Foto de perfil">
            <p>Nome: ${perfil.name.first} ${perfil.name.last}</p>
            <p>Email: ${perfil.email}</p>
            `;
          resultadosDiv.appendChild(perfilDiv);
        });
      } catch (error) {
        resultadosDiv.innerHTML = `<p>Erro ao carregar os perfis: ${error.message}</p>`;
        console.error("Erro ao analisar a resposta da API:", error);
      }
    } else {
      resultadosDiv.innerHTML = `<p>Erro ao carregar os perfis: ${xhr.statusText}</p>`;
      console.error("Erro na requisição:", xhr);
    }
  };
  xhr.send();
}
