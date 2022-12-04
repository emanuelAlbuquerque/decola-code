const formularioCadastroAulas = document.querySelector('#formulario-cadastro_aulas')
const formularioAlterarAulas = document.querySelector('#formulario-atualiza_aulas')
const buttonFinalizarAula = document.querySelector('#finalizar_aula')
const buttonAtualizaAula = document.querySelector('#atualizar_aula')
const modalAtualizaAula = document.querySelector('#atualiza-aula')
const containerInformacaoCadastroAula = document.querySelector('#container-informacao_cadastro-aula')

const inputNome = document.querySelector('#nome')
const inputEmail = document.querySelector('#email')
const inputTemaAula = document.querySelector('#tema')
const inputDataEHora = document.querySelector('#date')
const inputDuracao = document.querySelector('#time')
const inputLocal = document.querySelector('#local')
const inputDescricao = document.querySelector('#descricao')

const idAula = document.querySelector('#idaula')
const alterarNome = document.querySelector('#alterarNome')
const alterarEmail = document.querySelector('#alterarEmail')
const alterarTema = document.querySelector('#alterarTema')
const alterarData = document.querySelector('#alterarData')
const alterarDuracao = document.querySelector('#alterarDuracao')
const alterarLocal = document.querySelector('#alterarLocal')
const alterarDescricao = document.querySelector('#alterarDescricao')

const corpoTabelaAulas = document.querySelector('#tbody_aulas')



formularioCadastroAulas.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const nome = inputNome.value
  const email = inputEmail.value
  
  const temaAula = inputTemaAula.value

  const dataEHora = inputDataEHora.value.split('T')  
  const dataAula = dataEHora[0]//Lembrar de quando pegar os valores no bs passar a data para o nosso formato
  const horaAula = dataEHora[1]

  const duracao = inputDuracao.value
  const local = inputLocal.options[inputLocal.selectedIndex].text;
  const descricao = inputDescricao.value

  cadastrarAula(nome, email, temaAula, dataAula, horaAula, duracao, local, descricao)
})

formularioAlterarAulas.addEventListener('submit', alterarAula)



function cadastrarAula(nome, email, temaAula, dataAula, horaAula, duracao, local, descricao) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    containerInformacaoCadastroAula.style.display = 'block'
    containerInformacaoCadastroAula.innerHTML = 'Aula cadastrada'
  }
  xhttp.open("POST", "http://localhost:8080/novaaula");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(
    {
      "nome": nome,
      "email": email,
      "tema_aula": temaAula,
      "data_aula": dataAula,
      "hora_aula": horaAula,
      "duracao": duracao,
      "local": local,
      "descricao": descricao
    }
  ));
}


function finalizarAula(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    containerInformacaoCadastroAula.innerHTML = "Aula removida";
    listarAluno();
  }
  xhttp.open("DELETE", "http://localhost:8080/finalizaraula/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

function mostrarTelaAlterarAula(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    const aula = JSON.parse(this.responseText);
    idAula.value = aula.id;
    alterarNome = aula.nome
    alterarEmail = aula.email
    alterarTema.value = aula.tema_aula;
    alterarData.value = aula.data_aula.concat(aula.hora_aula).join('T');
    alterarDuracao.value = aula.duracao;
    alterarLocal.value = aula.local;
    alterarDescricao.value = aula.descricao;
  }
  xhttp.open("GET", `http://localhost:8080/getaula/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

function alterarAula(e) {
  e.preventDefault()

  // Colocar para pegar o nome e o email

  const dataEHora = alterarData.value.split('T')
  const dataAula = dataEHora[0]//Lembrar de quando pegar os valores no bs passar a data para o nosso formato
  const horaAula = dataEHora[1]
  
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    containerInformacaoCadastroAula.innerHTML = "Aula alterada!";
  }
  xhttp.open("PUT", "http://localhost:8080/atualizaraluno/" + idAula.value);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(
    { 
      "nome": alterarNome.value,
      "email": alterarEmail.value,
      "tema_aula": alterarTema.value,
      "data_aula": dataAula,
      "hora_aula": horaAula,
      "duracao": alterarDuracao.value,
      "local": alterarLocal.value,
      "descricao": alterarDescricao.value
    }
  ));
}


function listarAulas() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    const aulas = JSON.parse(this.responseText);
    
    aulas.forEach(aula => {
      corpoTabelaAulas.innerHTML += 
        `
          <tr>
            <td>
              <div class="d-flex align-items-center">
                <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 45px; height: 45px"
                  class="rounded-circle" />
                <div class="ms-3">
                  <p class="fw-bold mb-1">${aula.nome}</p>
                  <p class="text-muted mb-0">${aula.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="fw-normal mb-1">Lógica de Programação</p>
              <p class="text-muted mb-0">${aula.tema_aula}</p>
            </td>
            <td>
              <p class="fw-normal mb-1">${aula.data_aula} - ${aula.horaAula}</p>
            </td>
            <td>${aula.local}</td>
            <td>
              <button 
                type="button" 
                class="btn btn-sm btn-rounded" 
                id="finalizar_aula"
                onclick=" finalizarAula(${aula.id})" 
              >
                Finalizar Aula
              </button>
              <button 
                type="button" 
                class="btn btn-sm btn-rounded" 
                id="atualizar_aula"
                data-mdb-target="#atualiza-aula"
                data-mdb-toggle="modal"
                onclick="mostrarTelaAlterarAula(${aula.id})"
                >
                Alterar aula
              </button>
            </td>
          </tr>
        `
    });
  }
  xhttp.open("GET", "http://localhost:8080/aulas");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send();
}

