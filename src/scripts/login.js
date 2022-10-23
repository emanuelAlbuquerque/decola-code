var esqueceuSenha = document.getElementById('esqueceu-senha') //Pega o botão esqueceu senha na tela de login.
var loginUsuario = document.getElementById('login-usuario') //Pega o formulario de login
var voltaLogin = document.getElementById('volta-login') //Pega o botão que volta da tela de envio do código para a tela de login.
var enviaCodigEmail = document.getElementById('envia_codigo-email') //Pega o botão que envia o código para o e-mail
var alteraSenha = document.getElementById('altera-senha') //Pega o form que altera a senha
var enviaCodigo = document.getElementById('envia-codigo') //Pega o form que envia código
var voltaLoginAletraSenha = document.getElementById('volta-login-altera_senha') //Pega o botão de voltar do form alteraSenha
const alertaLogin = document.querySelector('#alerta-login')
var dNone = 'none'
var dBlock = 'block'



function voltarLogin() {
  loginUsuario.style.display = dBlock
  enviaCodigo.style.display = dNone
  alteraSenha.style.display = dNone
}

esqueceuSenha.addEventListener('click', () => {
  enviaCodigo.style.display = dBlock
  loginUsuario.style.display = dNone
  alteraSenha.style.display = dNone
}) //Quando ele clicar em esqueceu senha, apaga da tela a pagina de login e aparece a de enviar codigo

enviaCodigEmail.addEventListener('click', () => {
  loginUsuario.style.display = dNone
  enviaCodigo.style.display = dNone
  alteraSenha.style.display = dBlock
}) //Quando ele apertar no botão de enviar o código por email, aparece a tela de alterar senha e apaga a tela de enviar codigo

voltaLogin.addEventListener('click', voltarLogin) //Quando ele clicar no botão de voltar na tela de envio de código, apaga da tela o formulário de envio de codigo e aparece a tela de login

voltaLoginAletraSenha.addEventListener('click', voltarLogin) //Quando ele clica no botão de voltar na tela de alterar senha, aparece a tela de login

let matricula = loginUsuario.matricula
let senha = loginUsuario.senha

loginUsuario.addEventListener('submit', (event) => {
  event.preventDefault()

  let matriculaUsuario = matricula.value
  let senhaUsuario = senha.value

  if (matriculaUsuario == '01519694' && senhaUsuario == '12345'){
    window.location.href = '../perfil/perfil.html'
  }else{
    alertaLogin.textContent = 'Ops! matricula ou senha incorretos!'
    alertaLogin.style.display = dBlock
    matricula.value = ''
    senha.value = ''
    matricula.focus()
  }
})

matricula.addEventListener('input', () => {
  alertaLogin.style.display = dNone
})

senha.addEventListener('input', () => {
  alertaLogin.style.display = dNone
})