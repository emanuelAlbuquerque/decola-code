let esqueceuSenha = document.getElementById('esqueceu-senha') //Pega o botão esqueceu senha na tela de login.
let loginUsuario = document.getElementById('login-usuario') //Pega o formulario de login
let voltaLogin = document.getElementById('volta-login') //Pega o botão que volta da tela de envio do código para a tela de login.
let alteraSenha = document.getElementById('altera-senha') //Pega o form que altera a senha
let enviaCodigo = document.getElementById('envia-codigo') //Pega o form que envia código
let voltaLoginAletraSenha = document.getElementById('volta-login-altera_senha') //Pega o botão de voltar do form alteraSenha
let alertaLogin = document.querySelector('#alerta-login')
let alertaCodigo = document.querySelector('#alerta-codigo')
let alertaSenha = document.querySelector('#alerta-senha')
let dNone = 'none'
let dBlock = 'block'
let matricula = loginUsuario.matricula
let senha = loginUsuario.senha



function voltarLogin() {
  loginUsuario.style.display = dBlock
  enviaCodigo.style.display = dNone
  alteraSenha.style.display = dNone

  enviaCodigo.email.value = ''
}

esqueceuSenha.addEventListener('click', () => {
      enviaCodigo.style.display = dBlock
      loginUsuario.style.display = dNone
      alteraSenha.style.display = dNone
})

alteraSenha.addEventListener('submit', (event) => {
  event.preventDefault()

  let contadora = 0
  alertaSenha.style.display = dBlock
  alertaSenha.textContent = `Senha alterada com sucesso!`

  let interval = setInterval(mudaTela, 1000)


  function mudaTela() {
    contadora++

    if (contadora == 3) {
      enviaCodigo.style.display = dNone
      loginUsuario.style.display = dBlock
      alteraSenha.style.display = dNone
      window.location.replace('../../../src/pages/login/login.html')
      clearInterval(interval)
    }
  }
}) //Quando ele clicar em esqueceu senha, apaga da tela a pagina de login e aparece a de enviar codigo


enviaCodigo.addEventListener('submit', (event) => {
  event.preventDefault()

    let contadora = 0
    alertaCodigo.style.display = dBlock
    alertaCodigo.textContent = `Código enviado com sucesso para o seu E-mail! Porfavor espere um instante!`
    
    let interval = setInterval(mudaTela, 1000)
 
 
    function mudaTela(){
    contadora++
  
    if(contadora == 3){
      enviaCodigo.style.display = dNone
      loginUsuario.style.display = dNone
      alteraSenha.style.display = dBlock
      clearInterval(interval)
    }
  }
})


voltaLogin.addEventListener('click', voltarLogin) //Quando ele clicar no botão de voltar na tela de envio de código, apaga da tela o formulário de envio de codigo e aparece a tela de login

voltaLoginAletraSenha.addEventListener('click', voltarLogin) //Quando ele clica no botão de voltar na tela de alterar senha, aparece a tela de login


loginUsuario.addEventListener('submit', (event) => {
  event.preventDefault()

  let matriculaUsuario = matricula.value
  let senhaUsuario = senha.value

  if (matriculaUsuario == '01519694' && senhaUsuario == '12345'){
    window.location.href = '../tela-Instrutores/telaInstrutores.html'
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