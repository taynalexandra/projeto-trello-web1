var formCadastro = document.getElementById("form-cadastro");
var linkCadastrar = document.getElementById("linkCadastro");

var formLogin = document.getElementById("form-login");
var linkLogin = document.getElementById("linkLogin");

/**
 * Script para exibir apenas um formulário por vez
 */
formLogin.style.display = "block";
formCadastro.style.display = "none";

linkLogin.addEventListener("click", function () {
    formLogin.style.display = "block";
    formCadastro.style.display = "none";
});

linkCadastrar.addEventListener("click", function () {
    formLogin.style.display = "none";
    formCadastro.style.display = "block";
});

/**
 * Script Formulário de Cadastro
 */
formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    var usuario = {
        "name": document.getElementById("nome-cadastro").value,
        "username": document.getElementById("username-cadastro").value,
        "password": document.getElementById("senha-cadastro").value
    }

    var url = "http://tads-trello.herokuapp.com/api/trello/users/new";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(JSON.stringify(obj));
        }
    }
    
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usuario));

    formCadastro.reset();
    alert("Usuário Cadastrado!");
    formLogin.style.display = "block";
    formCadastro.style.display = "none";
})

/**
 * Script Formulário de Login
 */
formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var usuario = {
        "username": document.getElementById("username-login").value,
        "password": document.getElementById("senha-login").value
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/login";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var token = JSON.parse(this.responseText);
            token = JSON.stringify(token);
            localStorage.setItem("token", token);
            location.href = "index.html";
        } 
        if (this.status == 400){
            formLogin.reset();
        }
    }
    
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(usuario));
})

