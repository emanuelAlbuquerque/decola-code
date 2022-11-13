const inputNome = document.querySelector('#nome')
const inputEmail = document.querySelector('#email')
const inputInstituicao = document.querySelector('#instituicao')
const inputMatricula = document.querySelector('#matricula')
const inputSenha = document.querySelector('#senha')
const inputConfirmaSenha = document.querySelector('#confirmar_senha')
const buttonCadastrarUsuario = document.querySelector('#cadastrar_usuario')
const formCadastroAluno = document.querySelector('#cadastro_usuario')
const containerAlertaUsuarioCadastrado = document.querySelector('#alerta_cadastrado')
const containerAlertaErroCadastro = document.querySelector('#alerta-erro_cadastro')


formCadastroAluno.addEventListener('submit', (e) => {
  e.preventDefault()
  
  const nome = inputNome.value 
  const email = inputEmail.value
  const instituicao = inputInstituicao.value
  const matricula = inputMatricula.value 
  const senha = inputSenha.value
  const confirmaSenha = inputConfirmaSenha.value
  if (senha !== confirmaSenha){
    containerAlertaErroCadastro.innerHTML = "As senhas não coinsidem"
    return
  }
  cadastrarAluno(nome, email, instituicao, matricula, senha)
})

function cadastrarAluno(nome, email, instituicao, matricula, senha) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    containerAlertaUsuarioCadastrado.style.display = 'block'
  }
  xhttp.open("POST", "http://localhost:8080/novoinstrutor");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(
    { 
      "nome": nome, 
      "email": email,
      "instituicao": instituicao,
      "matricula": matricula,
      "senha": senha
    }
  ));
}


