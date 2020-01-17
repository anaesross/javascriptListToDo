// no js não faz diferença o ; mas colocamos  por habito do php

// passo 5 - funcionalidades do  que foi criado no html

// id para aparecer um box para cada tarefa  nova
let board = document.getElementById('board');
// agora não faz muita diferenca do de cima para o de baixo
// let board = document.querySelector('.board')

// botao para adicionar tarefas
let buttonAdd = document.getElementById('add');

// passo 8 -  para adicionar descricao de nova tarefa:
let inputAdd = document.getElementById('novaTarefa');

// passo 10 - para nao zerar o array criado na renderizacao
let listaTarefas = [];
if (localStorage.getItem('listaTarefas')) {
    listaTarefas = JSON.parse(localStorage.getItem('listaTarefas'))    
}else{
    // listaTarefas = []; - porque colocamos acima da funcao
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));    
}
// testando agora no navegador, mesmo que atualize a pagina ele mantem as tarefas anteriores

// para armazer as tarefas novas, primeiro cria o array e depois transforma em json (stringify - o parse faz o contrário): - cancelado no passo 10
// let listaTarefas = [];
// localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));

//passo 9 - continuacao:
mostrarNaTela(listaTarefas);

// passo 5 - continuacao
buttonAdd.onclick = function (event){

    // passo 8 - continuacao:
    let valorDigitado = inputAdd.value;
    // apos criar localStorage, para dar push da tarefa para ele:
    listaTarefas.push(valorDigitado)

    gerarTarefa(valorDigitado, listaTarefas.length - 1);  // chamando a outra função para executar dentro da function onclick, o
    //conteúdo abaixo comentado estava redundante.


    // passo 5 - continuacao
    // onclick = quando o botao eh acionado
    // function() = eh uma funcao anonima, nao pode ser chamada depois para reaproveitamento de codigo, entoa soh eh usada quando sabemos que nao precisamos reutilizar.    

    // testando:    
    // alert("Estou no clik do botao")


   /*  // passo 6 - para que cada nova tarefa crie um novo box
    // createElement = para criar um box novo, dizendo no parenteses que elemento é esse, no caso do  primeiro uma div. Estamos basicamente replicando a estrutura montada no html e bootstrap:
    let tarefa = document.createElement('div');
    // puxar os atributos da classe tarefa:
    tarefa.setAttribute('class', 'tarefa');

    // criar a descricao/texto da tarefa:
    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col=md-8');
    // para o usuario colocar a descrição da tarefa:
    // estatico para teste:
    // titulo.textContent = "Essa é uma nova tarefa"; - cancelado na etapa 8
    titulo.textContent = valorDigitado;

    // criar o botao de check/feito:
    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    // criar a imagem do botao check:
    let imgCheck = document.createElement('img');
    // abaixo puxo a classe que criei para controlar o tamanho da imagem:
    imgCheck.setAttribute('class', 'botaoCheck');
    // puxando a imagem em si do botao:
    imgCheck.setAttribute('src', 'images/botao_check.png');

    //para colocar o titulo, botao e imagem dentro do "tarefa":
    // abaixo: estou colocando o elemento botao dentro a imagem dele:
    buttonCheck.appendChild(imgCheck);
    // colocando os elementos dentro da "tarefa":
    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);

    // colocar os box "tarefa" dentro do "board"
    board.appendChild(tarefa); */

    // testando agora no navegador, ao apertar o botao "adicionar tarefas", aparece um novo box de tarefa.

    // passo 8 - continuação da funcao que puxa a tarefa nova apos - listaTarefas.push(valorDigitado)
    // apos o comando abaixo o teste no navegador, com F12 traz no storage a informação carregada, mas F5 ainda apaga da memoria
    localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas))
    // para renderizar as tarefas (armazenar em definitivo e retornar na tela) - seguir passo 9
}

// passo 9 - renderizacao das tarefas
// criar functions e copiar o box acima na gerarTarefa
// item eh a informação que estamos armazenando (box tarefa nova)
function mostrarNaTela(listaTarefas) {
/*     for(let item of listaTarefas){
        gerarTarefa(item)
    } */
    board.innerHTML= "" //estou substituindo dentro do html nada, vazio, limpei o board
    listaTarefas.forEach(function(valor, posicao){
        gerarTarefa(valor, posicao); //valor = conteudo digitado e posicao = indice no array
    })
}

function gerarTarefa(valorDigitado, posicao) {
    
    let tarefa = document.createElement('div');
    tarefa.setAttribute('class', 'tarefa');
    tarefa.setAttribute('posicao', posicao);//posicao  = indice do array de cada tarefa


    let titulo = document.createElement('div');
    titulo.setAttribute('class', 'col=md-8');
    titulo.textContent = valorDigitado;

    let buttonCheck = document.createElement('div');
    buttonCheck.setAttribute('class', 'col-md-2');

    let imgCheck = document.createElement('img');
    imgCheck.setAttribute('class', 'botaoCheck');
    imgCheck.setAttribute('src', 'images/botao_check.png');

    buttonCheck.appendChild(imgCheck);

    //definir um evento na tarefa que estou criando.
    imgCheck.onclick = function(){
        let tarefaPai = event.target.parentNode.parentNode; //aqui atribuimos uma variavel para o elemento que 
        //queremos no caso seria a div que contem a class tarefa
        //selecionar o elemento printa no console , aqui pegamos a div da classe tarefa
        //console.log(event.target.parentNode.parentNode); //img (pai div) / div (pai)div class  = tarefa
        
        let posicaoTarefa = tarefa.getAttribute('posicao'); //pegar a posicao do elementro dentro do array para
        //remover ele do storage

        listaTarefas = listaTarefas.filter(function(valor,posicao){ //filtro cria um novo array apenas com os 
            //elementos que eu quero, no caso eu exclui uma tarefa, ele forma um novo array sem a tarefa excluida
            return posicao != posicaoTarefa;
        });
        mostrarNaTela(listaTarefas); //mostra na tela as novas posições do array quando uma tarefa for elimidada

        console.log(listaTarefas);

        /*listaTarefas.splice(posicaTarefa); // splice vai remover o elemento no array, 
        //ele retorna apenas o elemento removido

        console.log(listaTarefas); // visualizar no console a ação */
        localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas)) // salva no storage a nova lista de tarefas
        //remover a tarefa
        tarefaPai.remove();
        //como eu ja sei que o elemento que quero é a classe tarefa eu poderia fazer direto :
        //tarefa.remove();
    }

    //parent node pega o  pai do elemento que estamos selecionando 

    tarefa.appendChild(titulo);
    tarefa.appendChild(buttonCheck);

    board.appendChild(tarefa);
}