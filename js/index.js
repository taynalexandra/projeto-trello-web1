var formNovoBoard = document.getElementById("form-novoBoard");
var btnAdicionarBoard = document.getElementById("btnSubmit-AdicionarBoard");
var formEditarBoard = document.getElementById("form-editarBoard");

var tokenLocalStorage = JSON.parse(localStorage.getItem("token"));
var board = document.getElementById("boards");


/**
 * Script para verificar se existe token armazenado no navegador
 */
window.onload=function(){
    if(this.tokenLocalStorage){
        var divTxt1 = '<div class="col-sm-2"><a href="#" data-toggle="modal" data-target="#modalNovoBoard"><div class="card shadow-none mb-5 bg-light rounded"><div class="card-body" style="background-color: white; color: dimgrey"><h5 class="card-title" id="tituloBoard">Novo Board</h5></div></div></a></div>';
        board.innerHTML = board.innerHTML + divTxt1;
    
        listarBords(tokenLocalStorage);
    } else {
        alert("Favor Realizar Login!");
        location.href = "loginCadastro.html";
    }
}

/**
 * Script para adicionar novo board
 */
formNovoBoard.addEventListener("submit", function (e) {
    e.preventDefault();

    var novoBoard = {
        name: document.getElementById("name-board").value,
        color: document.getElementById("color-board").value,
        token: tokenLocalStorage.token
    }

    var url = "https://tads-trello.herokuapp.com/api/trello/boards/new";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
        }
    }

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(novoBoard));

    alert("Board adicionado!");
    window.location.reload();

})

/**
 * Script para editar um board
 */
formEditarBoard.addEventListener("submit", function(e) {
    e.preventDefault();

    var boardId = JSON.parse(localStorage.getItem("board"));

    console.log("capturei o submit");

    var editarBoardFormValores = {
        name: document.getElementById("name-board-editar").value,
        color: document.getElementById("color-board-editar").value,
    }

    console.log(editarBoardFormValores);
    if(editarBoardFormValores.name){
        console.log("nome");
        var dadosRenomearBoard = {
            board_id: boardId.board,
            name: editarBoardFormValores.name,
            token: tokenLocalStorage.token
        };
    
        var url = "https://tads-trello.herokuapp.com/api/trello/boards/rename";
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {} 
        };
        
        xhttp.open("PATCH", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dadosRenomearBoard));
    }

    if(editarBoardFormValores.color){
        console.log("cor");
        var dadosAlterarCorBoard = {
            board_id: boardId.board,
            color: editarBoardFormValores.color,
            token: tokenLocalStorage.token
        };
    
        var url = "https://tads-trello.herokuapp.com/api/trello/boards/newcolor";
        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {} 
        };
        
        xhttp.open("PATCH", url, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(dadosAlterarCorBoard));
    }
    
    window.location.reload();
})



/**
 * Função para listar os boards já cadastrados
 * @param {*} tokenLocalStorage 
 */
function listarBords(tokenLocalStorage) {
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/" + tokenLocalStorage.token;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);

            //Adiciona a lista de boards no LocalStorage
            var listaDeBoards = JSON.stringify(obj);
            localStorage.setItem("boards", listaDeBoards);
            
            for (var i in obj) {

                var dadosBoard = {
                    id: obj[i].id,
                    name: obj[i].name,
                    color: obj[i].color
                }
    
                var divTxt = '<div class="col-sm-2 id="' + dadosBoard.id + '"><a href="listas.html" class="linkBoard" OnClick="capturarIdBoard('+ dadosBoard.id +')"><div class="card id="' + dadosBoard.id + 'shadow-none mb-5 bg-light rounded"><div class="card-body" style="background-color: ' + dadosBoard.color + ';"><h5 class="card-title" id="tituloBoard">' + dadosBoard.name + '</h5><a href="#" data-toggle="modal" data-target="#modalEditarBoard" OnClick="capturarIdBoard('+ dadosBoard.id +')"><img src="./img/iconeEditar.png" class="icone-editar-board"/></a><a href="#" OnClick="excluirBoard('+ dadosBoard.id +')"><img src="./img/iconeLixeira.png" class="icone-lixeira-board"/></a></div></div></a></div>';
                board.innerHTML = divTxt + board.innerHTML;
            }
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();
};

/**
 * Função que armazena o id do board clicado pelo usuário na localStorage
 * @param {*} idBoard
 */
function capturarIdBoard(idBoard){
    var idBoardClick = {
        board: idBoard
    }
    idBoardClick = JSON.stringify(idBoardClick);
    localStorage.setItem("board", idBoardClick);
}


/**
 * Função para excluir um board
 * @param {*} idBoard 
 */
function excluirBoard(idBoard) {
    var dados = {
        board_id: idBoard,
        token: tokenLocalStorage.token
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        } 
    };
    var url = "https://tads-trello.herokuapp.com/api/trello/boards/delete";
    xhttp.open("DELETE", url, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dados));
    
    window.location.reload();
}