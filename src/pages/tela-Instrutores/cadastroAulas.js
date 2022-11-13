const formularioCadastroAulas = document.querySelector('#formulario-cadastro_aulas')
const inputNome = document.querySelector('#nome')
const inputTemaAula = document.querySelector('#tema')
const inputDataEHora = document.querySelector('#date')
const inputDuracao = document.querySelector('#time')
const inputLocal = document.querySelector('#local')
const inputDescricao = document.querySelector('#descricao')
const containerInformacaoCadastroAula = document.querySelector('#container-informacao_cadastro-aula')
const buttonFinalizarAula = document.que


formularioCadastroAulas.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const nome = inputNome.value
  const temaAula = inputTemaAula.value

  const dataEHora = inputDataEHora.value.split('T')  
  const dataAula = dataEHora[0]//Lembrar de quando pegar os valores no bs passar a data para o nosso formato
  const horaAula = dataEHora[1]

  const duracao = inputDuracao.value
  const local = inputLocal.options[inputLocal.selectedIndex].text;
  const descricao = inputDescricao.value

  cadastrarAula(nome, temaAula, dataAula, horaAula, duracao, local, descricao)
})

function cadastrarAula(nome, temaAula, dataAula, horaAula, duracao, local, descricao) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    containerInformacaoCadastroAula.style.display = 'block'
    containerInformacaoCadastroAula.innerHTML = 'Aula cadastrada'
  }
  xhttp.open("POST", "http://localhost:8080/novoinstrutor");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(
    {
      "nome": nome,
      "tema_aula": temaAula,
      "data_aula": dataAula,
      "hora_aula": horaAula,
      "duracao": duracao,
      "local": local,
      "descricao": descricao
    }
  ));
}



