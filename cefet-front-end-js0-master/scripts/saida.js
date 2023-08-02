let valorObtidoPorExercicio = {};
const PREFIX_EXERCICIO = "div-ex";
let containerExPrefixo = PREFIX_EXERCICIO;
let silentMode = false;


function setContainerExPrefixo(strPrefix){
    containerExPrefixo = strPrefix;
}
function resetContainerExPrefixo(){
    containerExPrefixo = PREFIX_EXERCICIO;
}
function setSilentMode(pSilentMode){
    silentMode = pSilentMode;
}
function obtemContainerExercicio(numero_exercicio) {
    let strId = containerExPrefixo + numero_exercicio;
    let containerTesteEl = document.getElementById(strId);
    return containerTesteEl;
}

function adicionaRotulo(containerEl, strRotuloVariavel) {
    let labelEl = document.createElement("span");
    labelEl.className = "rotulo-variavel";
    labelEl.innerHTML = strRotuloVariavel;
    containerEl.appendChild(labelEl);
}

function adicionaValor(containerEl, valor) {
    let labelEl = document.createElement("span");
    labelEl.className = "valor-variavel";
    if (typeof(valor) == "string") {
        
        labelEl.innerHTML = '"' + valor + '"';
    } else {
        if(typeof(valor) == "object" && valor != null){
            labelEl.innerHTML = '[ ' + valor + ' ]';
        }else{
            labelEl.className = "valor-variavel";
            labelEl.innerHTML = valor+"";
        }

    }
    containerEl.appendChild(labelEl);
}
function obtemValorExercicio(numExercicio){
    return valorObtidoPorExercicio[numExercicio];
}
function limpaValoresExercicio(numExercicio){
    valorObtidoPorExercicio[numExercicio] = {};
}
function escreva(numExercicio, strRotuloVariavel, valorVariavel) {
    //as saidas sao só armazenadas quando se esta escrevendo 
    //a saida do exercicio - caracterizada quando containerExPrefixo == PREFIX_EXERCICIO
    if(containerExPrefixo == PREFIX_EXERCICIO){
        //adiciona o valor obtido neste exercicio
        if (! (numExercicio in valorObtidoPorExercicio)) {
            valorObtidoPorExercicio[numExercicio] = {};
        } 
        valorObtidoPorExercicio[numExercicio][strRotuloVariavel] = valorVariavel;
    }
    
    if(silentMode){
        return;
    }
    //verifica se é vetor (ou matriz) para exibi-la apropriadamente
    if (Array.isArray(valorVariavel)) {
        if (valorVariavel.length>0) {
            //se for um vetor em q a primeira posicao é um vetor,
            //entao, considera-se uma matriz
            if (Array.isArray(valorVariavel[0])) {
                escrevaMatriz(numExercicio, strRotuloVariavel, valorVariavel);
                return;
            }
        }
        if(valorVariavel.length != 0){
            escrevaVetor(numExercicio, strRotuloVariavel, valorVariavel);
            return;
        }else{
            valorVariavel = [];
        }
    }
    
    //quando não é uma variavel composta: 
    //procura obtem o container
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    
    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(containerExercicioEl, strRotuloVariavel + ":");    
    
    adicionaValor(containerExercicioEl, valorVariavel);
}

function escrevaMensagem(numExercicio, strMensagem) {
    if (silentMode) {
        return;
    }
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let pMsg = document.createElement("p");
    pMsg.innerHTML = strMensagem;
    containerExercicioEl.appendChild(pMsg);
}

function escrevaVetor(numExercicio, strRotuloVariavel, valorVariavel) {
    //procura obtem o container do teste
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let divVariavelEl = document.createElement("div");
    divVariavelEl.className = "variavel-composta";
    containerExercicioEl.appendChild(divVariavelEl);
    
    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(divVariavelEl, strRotuloVariavel + ":");  
    let tabelaEl = document.createElement("table");
    divVariavelEl.appendChild(tabelaEl);
    tabelaEl.className = "vetor";
    
    let linhaCabecalhoEl = document.createElement("tr");
    for (let i = 0; i < valorVariavel.length; i++) {
        let indiceIEl = document.createElement("td");
        indiceIEl.className = "indice";
        indiceIEl.innerHTML = i;
        linhaCabecalhoEl.appendChild(indiceIEl);
    }
    
    let linhaValoresEl = document.createElement("tr");
    for (let i = 0; i < valorVariavel.length; i++) {
        let valorIEl = document.createElement("td");
        valorIEl.className = "valor-pos-vetor";
        adicionaValor(valorIEl, valorVariavel[i]);
        linhaValoresEl.appendChild(valorIEl);
    }
    
    
    tabelaEl.appendChild(linhaCabecalhoEl);
    tabelaEl.appendChild(linhaValoresEl);
}

function escrevaMatriz(numExercicio, strRotuloVariavel, valorVariavel) {
    //procura obtem o container do teste
    let containerExercicioEl = obtemContainerExercicio(numExercicio);
    let divVariavelEl = document.createElement("div");
    containerExercicioEl.appendChild(divVariavelEl);
    divVariavelEl.className = "variavel-composta";
    //adiciona um subcontainer com o rotulo desta veriavel
    adicionaRotulo(divVariavelEl, strRotuloVariavel + ":");  
    let tabelaEl = document.createElement("table");
    tabelaEl.className = "matriz";
    let linhaCabecalhoEl = document.createElement("tr");
    linhaCabecalhoEl.appendChild(document.createElement("td"));
    let maxCol = 0;
    for (let i = 0; i < valorVariavel.length; i++) {
        if (valorVariavel[i].length > maxCol) {
            maxCol = valorVariavel[i].length;
        }
    }
    
    //imprime os indices
    for (let i = 0; i < maxCol; i++) {
        let indiceIEl = document.createElement("td");
        indiceIEl.className = "indice";
        indiceIEl.innerHTML = i;
        linhaCabecalhoEl.appendChild(indiceIEl);
    }
    
    tabelaEl.appendChild(linhaCabecalhoEl);
    
    for (let i = 0; i < valorVariavel.length; i++) {
        let linhaValoresEl = document.createElement("tr");
        //indice da i-esima linha da matriz
        let indiceIEl = document.createElement("td");
        indiceIEl.className = "indice";
        indiceIEl.innerHTML = i;
        linhaValoresEl.appendChild(indiceIEl);
        
        //imprime a j-ésima linha da matriz da i-ésima colna
        for(let j = 0; j < valorVariavel[i].length; j++) {
            
            let valorIEl = document.createElement("td");
            valorIEl.className = "valor-pos-matriz";
            adicionaValor(valorIEl, valorVariavel[i][j]);
            linhaValoresEl.appendChild(valorIEl);
        }
        tabelaEl.appendChild(linhaValoresEl);
    }
    divVariavelEl.appendChild(tabelaEl);
}
