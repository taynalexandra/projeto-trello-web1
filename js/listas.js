var formNovaLista = document.getElementById("form-novaLista");
var formNovoCard = document.getElementById("form-novoCard");
var btnAdicionarLista = document.getElementById("btnSubmit-AdicionarList");
var modalNovaLista = document.getElementById("modalNovaLista");
var modalNovoCard = document.getElementById("modalNovoCard");
var formEditarLista = document.getElementById("form-editarList");
var formEditarCard = document.getElementById("form-editarCard");
//var formComentariosCard = document.getElementById("form-comentario");

var listas = document.getElementById("listas");

// Pega o token armazenado no localStorage
var tokenLocalStorage = JSON.parse(localStorage.getItem("token"));
// Pega o id do board que foi clicado
var idBoardLocalStorage = JSON.parse(localStorage.getItem("board"));

/**
 * Script para mostrar listas cadastradas ao carregar a página
 */
window.onload = function () {
    if (this.tokenLocalStorage) {
        if (this.idBoardLocalStorage) {
            tituloBoardLists(idBoardLocalStorage);
            listarLists(idBoardLocalStorage, tokenLocalStorage);
        } else {
            alert("Favor Escolha um Board!");
            location.href = "index.html";
        }
    } else {
        alert("Favor Realizar Login!");
        location.href = "loginCadastro.html";
    }
}

/**
 * Script para Adicionar uma nova lista 
 */
formNovaLista.addEventListener("submit", function (e) {
    e.preventDefault();

    var novaLista = {
        name: document.getElementById("name-list").value,
        token: tokenLocalStorage.token,
        board_id: idBoardLocalStorage.board
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/lists/new";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
        }
    }

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(novaLista));
    alert("Lista adicionada!");
    window.location.reload();
})

/**
 * Script para Adicionar um novo card 
 */
formNovoCard.addEventListener("submit", function (e) {
    e.preventDefault();

    var idListLocalStorage = JSON.parse(localStorage.getItem("lista"));

    //formData = document.getElementById("date-Card").value;
    //formData = dataCard(formData);

    var novoCard = {
        name: document.getElementById("nome-card").value,
        data: "",
        token: tokenLocalStorage.token,
        list_id: idListLocalStorage.lista
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/new";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

        }
    }

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(novoCard));
    alert("Card adicionado!");
    window.location.reload();
})

/**
 * Script para editar uma lista
 */
formEditarLista.addEventListener("submit", function(e) {
    e.preventDefault();

    var listId = JSON.parse(localStorage.getItem("lista"));

    var editarListFormValores = {
        name: document.getElementById("name-list-editar").value,
    }

    if(editarListFormValores.name){
    
        var dadosRenomearList = {
            list_id: listId.lista,
            name: editarListFormValores.name,
            token: tokenLocalStorage.token
        };
    
        var url = "https://tads-trello.herokuapp.com/api/trello/lists/rename";
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {} 
        };
        
        xhttp.open("PATCH", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dadosRenomearList));
    }
    window.location.reload();
})

/**
 * Script para editar um card
 */
formEditarCard.addEventListener("submit", function(e) {
    e.preventDefault();

    var cardId = JSON.parse(localStorage.getItem("card"));

    var editarCardFormValores = {
        name: document.getElementById("name-card-editar").value,
    }

    if(editarCardFormValores.name){
        var dadosRenomearCard = {
            token: tokenLocalStorage.token,
            card_id: cardId.cardId,
            name: editarCardFormValores.name
        };
    
        var url = "https://tads-trello.herokuapp.com/api/trello/cards/rename";
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {} 
        };
        
        xhttp.open("PATCH", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dadosRenomearCard));
    }
    window.location.reload();
})

/*
formComentariosCard.addEventListener("submit", function(e) {
    e.preventDefault();

    
})
/*

/**
 * Função para Mostrar todas as listas existentes de um board, assim como seus respectivos cards
 * @param {*} idBoardLocalStorage 
 * @param {*} tokenLocalStorage 
 */
function listarLists(idBoardLocalStorage, tokenLocalStorage) {
    var url = "https://tads-trello.herokuapp.com/api/trello/lists/" + tokenLocalStorage.token + "/board/" + idBoardLocalStorage.board;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

            //Adiciona todas as listas de um boards no LocalStorage
            var listaDeLists = JSON.stringify(obj);
            localStorage.setItem("lists", listaDeLists);

            for (var i in obj) {

                var dadosList = {
                    name: obj[i].name,
                    id: obj[i].id
                }

                var divTxt = '<div class="div-list"><div class="list-group-item" id="' + dadosList.id + '"><h3 class="list-title">' + dadosList.name + '<a href="#" data-toggle="modal" data-target="#modalEditarList" OnClick="capturarIdList('+ dadosList.id +')"><img src="./img/iconeEditar.png" class="icone-editar-list"/></a><a href="#" OnClick="excluirList('+ dadosList.id +')"><img src="./img/iconeLixeira.png" class="icone-lixeira-list"/></a></h3></div><a href="#" OnClick="capturarIdList(' + dadosList.id + ')" data-toggle="modal" data-target="#modalNovoCard"><button class="add-card-btn btn">+ Add card</button></a></div>';
                listas.innerHTML = listas.innerHTML + divTxt;

                var listaListada = document.getElementById(dadosList.id);
                listaListada.setAttribute("ondragover", "overAction(event)");
                listaListada.setAttribute("ondrop", "dropAction(event, "+dadosList.id+")");

                //==================== Código para adicionar os cards de um board ====================
                var url = "https://tads-trello.herokuapp.com/api/trello/cards/" + tokenLocalStorage.token + "/list/" + dadosList.id;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var objCard = JSON.parse(this.responseText);
                        var listaCorrespondente = document.getElementById(dadosList.id);

                        for (var i in objCard) {

                            var dadosCards = {
                                id: objCard[i].id,
                                name: objCard[i].name,
                                data: objCard[i].data
                            }

                            //var cardListado = document.createElement("div");
                            //cardListado.setAttribute("class", "list-group-item item-card");
                            //cardListado.setAttribute("id", dadosCards.id);
                            //cardListado.setAttribute("ondragstart", "dragStart(event)");
                            //cardListado.innerHTML = dadosCards.name;

                            //listaCorrespondente.appendChild(cardListado);

                            var divTxt = '<a href="#" data-toggle="modal" data-target="#modalComentariosETags" OnClick="capturarIdCard('+ dadosCards.id +')"><div class="list-group-item item-card" id="'+dadosCards.id+'" draggable="true">'+dadosCards.name+'<a href="#" data-toggle="modal" data-target="#modalEditarCard" OnClick="capturarIdCard('+ dadosCards.id +')"><img src="./img/iconeEditar2.png" class="icone-editar-card"/></a><a href="#" OnClick="excluirCard('+ dadosCards.id +')"><img src="./img/iconeLixeira2.png" class="icone-lixeira-card"/></a></div></a>';
                            listaCorrespondente.innerHTML = listaCorrespondente.innerHTML + divTxt;
                            
                            var cardListado = document.getElementById(dadosCards.id);
                            cardListado.setAttribute("ondragstart", "dragStart(event)");
                           
                        }
                    }
                }
                xhttp.open("GET", url, false);
                xhttp.send();
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
};

/**
 * Função que coloca o nome do Board em sua página de Listas
 * @param {*} idBoard 
 */
function tituloBoardLists(idBoardLocalStorage) {
    var tituloLists = document.getElementById("titulo-lists");
    var boardsCadastrados = JSON.parse(localStorage.getItem("boards"));

    for (var i in boardsCadastrados) {
        if ((idBoardLocalStorage.board) == (boardsCadastrados[i].id)) {
            tituloLists.innerHTML = boardsCadastrados[i].name;
        }
    }
}

/**
 * Função que armazena o id da lista clicada pelo usuário na localStorage
 * @param {*} idList 
 */
function capturarIdList(idList) {
    var idListClick = {
        lista: idList
    }
    idListClick = JSON.stringify(idListClick);
    localStorage.setItem("lista", idListClick);
}

/**
 * Função que armazena o id do card clicado pelo usuário na localStorage
 * @param {*} idCard 
 */
function capturarIdCard(idCard){
    var idCardClick = {
        cardId: idCard 
    }
    idCardClick = JSON.stringify(idCardClick);
    localStorage.setItem("card", idCardClick);
}

/**
 * Função para tratar a data do card
 */
function dataCard(data) {
    dataRecebida = document.getElementById("date-Card").value;
    var resultado = dataRecebida + "-";
    resultado = dataRecebida.split("-", 3);
    resultado = resultado[2] + "/" + resultado[1] + "/" + resultado[0];

    return resultado;
}

/** 
 * Funções de Drag and Drop
 */
function dragStart(event, idCard) {
    event.dataTransfer.setData("text/plain", event.target.id);
    capturarIdCard(event.target.id);
}


function overAction(event) {
    event.preventDefault();
}

function dropAction(event, idList) {
    event.preventDefault();

    var cardLocalStorage = JSON.parse(localStorage.getItem("card"));

    const dados = event.dataTransfer.getData("text/plain");

    const elemento = document.getElementById(dados);

    var idLista = document.getElementById(idList);

    try {
        event.currentTarget.appendChild(elemento);
        alterarCartaoDeLista(cardLocalStorage.cardId, idList);
    } catch (error) {
        console.error("Não foi possível completar o Drop");
    }
    event.stopPropagation();
}

/**
 * Função para alterar um card de lista
 * @param {*} idCard 
 * @param {*} idList 
 */
function alterarCartaoDeLista(idCard, idList){
    var dados = {
        token: tokenLocalStorage.token,
        card_id: idCard,
        list_id: idList
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/changelist";
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

        } 
    };
        
    xhttp.open("PATCH", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
}

/**
 * Função para excluir uma list
 * @param {*} idList
 */
function excluirList(idList) {
    var dados = {
        list_id: idList,
        token: tokenLocalStorage.token
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/lists/delete";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        } 
    };
    
    xhttp.open("DELETE", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
    
    window.location.reload();
}

/**
 * Função para excluir um card
 * @param {*} idCard
 */
function excluirCard(idCard) {
    var dados = {
        card_id: idCard,
        token: tokenLocalStorage.token
    };

    var url = "https://tads-trello.herokuapp.com/api/trello/cards/delete";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        } 
    };
    
    xhttp.open("DELETE", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
    
    window.location.reload();
}

 /**
  * Função para listar as tags disponíveis
  */
function listaDeTags() {
    var url = "https://tads-trello.herokuapp.com/api/trello/tags";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
           
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();
}


/**
 * Função para adicionar comentário ao card
 * @param {*} cardId 
 * @param {*} cardName 
 */
/*
function adicionarComentario (cardId, cardName) {
    console.log("entrei");
    var tituloModalComentarios = document.getElementById("titulo-modal-comentarios");
    tituloModalComentarios.innerHTML = cardName;
}
*/