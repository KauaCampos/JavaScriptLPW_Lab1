
$( function() {
    desenhaTestes();
  });
let numExecucaoExercicio = {};
let numExecucaoOKExercicio = {};
const icoAviso = "⚠️";
const icoOk = "✅";
const icoNotOk = "❌";
function testaExecucoes(numExercicio, strFuncao, arrParametros, arrObjValoresEsperados, permitirSaida){
    if (!(numExercicio in numExecucaoExercicio)) {
        numExecucaoExercicio[numExercicio] = {};
        numExecucaoOKExercicio[numExercicio] = {};
    }
    if (!(strFuncao in numExecucaoExercicio[numExercicio])) {
        numExecucaoExercicio[numExercicio][strFuncao] = arrParametros.length;
        numExecucaoOKExercicio[numExercicio][strFuncao] = 0;
    }
    
    let funcao = window[strFuncao];
    if(funcao == undefined){
        exibirAviso(numExercicio, "nao_implementado","nao-implementado");
        return false;
    }
    try{

        //console.log(arrParametros);
        for(let i =0; i<arrParametros.length; i++){
            //console.log(i);
            testaExecucao(numExercicio, i+1, strFuncao, funcao, arrParametros[i], arrObjValoresEsperados[i], permitirSaida); 
            
        }
        let bolOk = Object.keys(numExecucaoExercicio[numExercicio]).reduce((ok, nomeFuncao) => ok && (numExecucaoExercicio[numExercicio][nomeFuncao] == numExecucaoOKExercicio[numExercicio][nomeFuncao]), true);
        exibirAviso(numExercicio, bolOk?"ok":"erro_execucao","conteudo");
        return bolOk;
    } catch (e) {
        exibirAviso(numExercicio, "erro_sitaxe","conteudo");
        throw e;
    }
}
function testaExecucao(numExercicio, numExecucao, strFuncao, funcao, parametros, objValoresEsperados, permitirSaida){
    
    let arrMsgErros = [];
    let arrChavesDiferentes = [];
    let strNumExercicio = (numExercicio+"").replaceAll(".","\\.");

    exibirAviso(numExercicio, "conteudo");
    if(funcao.length != parametros.length){
        arrMsgErros.push(`O número de parâmetros da função deveria ser ${parametros.length}`);
        $(`#teste-ex${strNumExercicio}-conteudo`).html(`${icoAviso} O número de parâmetros da função ${strFuncao} deveria ser ${parametros.length}, mas ela recebeu ${funcao.length}.`)
        return false;
    }

    if(arrMsgErros.length > 0){
        return false;
    }
    let bolIsOk = false;

    limpaValoresExercicio(numExercicio);
    //executa funcao
    setSilentMode(true);
    let parametrosNotModified = [...parametros];
    let retorno;
    let exception;
    try{

        retorno = funcao.apply(null, parametros);
    } catch (e) {
        arrMsgErros.push("O código não prosseguiu sua execução devido a um erro... pressione <kbd>F12</kbd> para analisá-lo.");
        setSilentMode(false);
        imprimeResultadoTeste(funcao, numExercicio, strFuncao, numExecucao,
            parametrosNotModified, arrMsgErros, [], objValoresEsperados, {}, true, retorno);
        throw e;
    } 
    setSilentMode(false);
    
    

    //verifica o teste
    let bolRetonoIgual = true;
    objValoresObtidos = obtemValorExercicio(numExercicio);
    
    //verifica o retorno da função
    if(""+retorno == "undefined" && "" in objValoresEsperados){
        arrMsgErros.push("A função deveria retornar algum valor.");
        bolIsOk = false;
    }else{
        if(""+retorno != "undefined" && !("" in objValoresEsperados)){
            arrMsgErros.push("A função não deveria retornar nada.");
            bolIsOk = false;
        }else{
            bolRetonoIgual = assertIsEqual( arrChavesDiferentes, "", objValoresEsperados[""], retorno);
            bolIsOk = bolRetonoIgual;
        }
    }
    //verifica a saida 
    
    let bolContemSaida = contemSaida(objValoresObtidos);
    if( !permitirSaida && bolContemSaida){
        arrMsgErros.push("Como esta função será reutilizada em outro exercício, ela não deveria escrever nada dentro dela (para exibir seu resultado, chame o <code class=\"funcao\">escreva</code> fora da função).");
        bolIsOk = false;
    }
    let bolSaidaOk = bolIsOk;
    let strRotulos = "";
    for(let chaveEsperada in objValoresEsperados){
        if(chaveEsperada == ""){
            continue;
        }
        if(! (chaveEsperada in objValoresObtidos)){
            //arrMsgErros.push(`Não foi possível encontrar o rotulo ${chaveEsperada}`);
            if(strRotulos != ""){
                strRotulos += "; ";
            }
            strRotulos += `<span class="variavel">${chaveEsperada}</span>`;
            bolIsOk = false;
        }else{
            bolSaidaOk = assertIsEqual( arrChavesDiferentes, chaveEsperada, 
                                    objValoresEsperados[chaveEsperada], objValoresObtidos[chaveEsperada]);
            if(!bolSaidaOk){
                bolIsOk = false;
            }
        }
        
    }
    if(strRotulos != ""){
        arrMsgErros.push(`Não foi possível encontrar o(s) rótulo(s) ${strRotulos}`);
    }
    imprimeResultadoTeste(funcao, numExercicio, strFuncao, numExecucao, parametrosNotModified, arrMsgErros, arrChavesDiferentes, objValoresEsperados, objValoresObtidos, bolRetonoIgual, retorno);
    if(bolIsOk){
        numExecucaoOKExercicio[numExercicio][strFuncao]++;
    }

    return bolIsOk;
}
function typeOf(valor){
    if(valor == undefined){
        return "undefined"
    }
    //verifica se é vetor (ou matriz) 
    if (Array.isArray(valor)) {
        if (valor.length>0) {
            //se for um vetor em q a primeira posicao é um vetor,
            //entao, considera-se uma matriz
            if (Array.isArray(valor[0])) {
                return 'matriz'
            }
        }
        
        return 'vetor';
    }
    return 'valor';
}
function assertIsEqual(arrChavesDiferentes, nomeRotulo, valorEsperado, valorObtido){
    let typeExpectedValue =typeOf(valorEsperado);
    let typeObtainedValue = typeOf(valorObtido);
    if(typeExpectedValue != typeObtainedValue){
        arrChavesDiferentes.push(nomeRotulo);
        return false;
    }

    //verifica se é igual dependendo do tipo
    let bolIsEqual = true;
    switch(typeExpectedValue){
        case "matriz":
            bolIsEqual = assertIsEqualMatrix(valorEsperado, valorObtido);
            break;
        case "vetor":
            bolIsEqual = assertIsEqualVector(valorEsperado, valorObtido);
            break;
        default:
            if(isNaN(valorEsperado)){
                bolIsEqual = valorEsperado == valorObtido;
            }else{
                bolIsEqual = Math.round(valorEsperado*1000) == Math.round(valorObtido*1000);
            }
            break;
    } 
    if(!bolIsEqual){
        arrChavesDiferentes.push(nomeRotulo);
    }
    return bolIsEqual;

}

function assertIsEqualVector(valorEsperado, valorObtido){
    if(valorEsperado.length != valorObtido.length){
        return false;
    }
    for(let i=0 ; i<valorEsperado.length ; i++){
        if(valorEsperado[i] != valorObtido[i]){
            return false;
        }
    }
    return true;

}
function assertIsEqualMatrix(valorEsperado, valorObtido){
    if(valorEsperado.length != valorObtido.length){
        return false;
    }
    if(valorEsperado[0].length != valorObtido[0].length){
        return false;
    }
    for(let i=0 ; i<valorEsperado.length ; i++){
        for(let j=0; j<valorEsperado[i].length; j++){
            if(valorEsperado[i] != valorObtido[i]){
                return false;
            }
        }
    }
    return true;
}
function criaTitulo(numExercicio, strPrefixExecucao, strLabel, strClass, strPrefixId){
    let divElemento = document.createElement("div");
    let pElemento = document.createElement("p");
    divElemento.className = strClass;
    pElemento.innerHTML = strLabel;
    pElemento.className = strClass;
    divElemento.id = `${strPrefixId}${strPrefixExecucao}${numExercicio}`;
    divElemento.appendChild(pElemento);
    return divElemento;
}
function contemSaida(objValores){
    return ("" in objValores && Object.keys(objValores).length>1) ||
        (!("" in objValores) && Object.keys(objValores).length>0);
}
function imprimeResultadoTeste(funcao, numExercicio, strFuncao, numExecucao, arrParametros, arrMsgErros, arrChavesDiferentes, objValoresEsperados, objValoresObtidos, bolRetornoIgual, retorno){
    let isOK = arrMsgErros.length == 0 && arrChavesDiferentes.length == 0 && bolRetornoIgual;
    let iconeExecucao = isOK?icoOk:icoNotOk;
    let strPrefixExecucao = `divTeste${numExecucao}${strFuncao}Ex`;
    let divTesteExercicio = document.getElementById(`teste-ex${numExercicio}-conteudo`);
    //Escreve a seção de execução
    let divExecucaoEl = document.createElement("div");
    let tituloExecucaoEl = document.createElement("h3");
    tituloExecucaoEl.innerHTML = `Execução #${numExecucao} ${iconeExecucao} - ${funcao.name}`;
    divTesteExercicio.appendChild(tituloExecucaoEl);
    divTesteExercicio.appendChild(divExecucaoEl);

    //apresenta os avisos (caso exista)
    if(arrMsgErros.length >0){
        let divAvisosEl = criaTitulo(numExercicio, strPrefixExecucao, '', "aviso", "aviso")
        divAvisosEl.className = "avisoErro";
        divExecucaoEl.appendChild(divAvisosEl);
        let avisoEl = null;
        for(let erro of arrMsgErros){
            avisoEl = document.createElement("p");
            avisoEl.innerHTML = `⚠️ ${erro}`;
            divAvisosEl.appendChild(avisoEl);
        } 
    }
    //Parametros 
    let divParametros = criaTitulo(numExercicio, strPrefixExecucao, 'Parâmetros', "parametro", "param")
    divExecucaoEl.appendChild(divParametros);
    setContainerExPrefixo(`param${strPrefixExecucao}`);
    for(let i=0; i<arrParametros.length ; i++){
        escreva(numExercicio, `#${i}`, arrParametros[i]);
    }

   
    
    //saídas impressas na tela
    if( contemSaida(objValoresEsperados)){
        let divSaida = criaTitulo(numExercicio, strPrefixExecucao, "Saídas Impressas na Tela", 'saidaImpressa', 'saida');
        divExecucaoEl.appendChild(divSaida);
        setContainerExPrefixo(`saida${strPrefixExecucao}`);
        escrevaTabelaComparacao(numExercicio, divSaida, strPrefixExecucao+"saida", objValoresEsperados, objValoresObtidos, false);
    }

    //retorno da função
    if(!bolRetornoIgual || (""+retorno) != 'undefined' || '' in objValoresEsperados){
        let divRetorno = criaTitulo(numExercicio, strPrefixExecucao, "Retorno da função", 'retorno', 'retorno');
        divExecucaoEl.appendChild(divRetorno);
        setContainerExPrefixo(`retorno${strPrefixExecucao}`);

        escreva(numExercicio, "Esperado", objValoresEsperados[""]);
        escreva(numExercicio, "Obtido", retorno);
    }

    resetContainerExPrefixo();
}
function escrevaTabelaComparacao(numExercicio, divTesteEl, strPrefixExecucao,objValoresEsperados, objValoresObtidos){
    
    let tabelaEl = document.createElement("table");
    let linhaCabecalhoEl = document.createElement("tr");
    let col1CabecalhoEl = document.createElement("th");
    let col2CabecalhoEl = document.createElement("th");
    let linhaSaidaEl = document.createElement("tr");
    let tdEsperadoEl = document.createElement("td");
    let tdObtidoEl = document.createElement("td");
    let strPrefixSaidaEsperada = strPrefixExecucao+"Esp";
    let strPrefixSaidaObtida = strPrefixExecucao+"Obtida";

    //tabela
    divTesteEl.appendChild(tabelaEl);
    tabelaEl.className = "tabelaExecucaoTeste";
    //cabeçalho
    col1CabecalhoEl.innerHTML = "Esperado";
    col2CabecalhoEl.innerHTML = "Obtido";
    linhaCabecalhoEl.appendChild(col1CabecalhoEl);
    linhaCabecalhoEl.appendChild(col2CabecalhoEl);
    tabelaEl.appendChild(linhaCabecalhoEl);

    //linha - saida do teste
    tdEsperadoEl.id = strPrefixSaidaEsperada+numExercicio;
    tdObtidoEl.id = strPrefixSaidaObtida+numExercicio;
    linhaSaidaEl.appendChild(tdEsperadoEl);
    linhaSaidaEl.appendChild(tdObtidoEl);
    tabelaEl.appendChild(linhaSaidaEl);

    //escreve chaves (rotulo das saidas) tanto nos valores esperados quanto nos obtidos
    let arrRotulo = Object.keys(objValoresEsperados)
                    .filter(val => val!="").sort();
    setContainerExPrefixo(strPrefixSaidaEsperada);
    for(let rotulo of arrRotulo){
        escreva(numExercicio, rotulo, objValoresEsperados[rotulo]);
    }

    setContainerExPrefixo(strPrefixSaidaObtida); 
    arrRotulo = Object.keys(objValoresObtidos)
                    .filter(val => val!="").sort();
    for(let rotulo of arrRotulo){
        if(rotulo in objValoresObtidos){
            escreva(numExercicio, rotulo, objValoresObtidos[rotulo]);
        }
    }   
    divTesteEl.innerHTML += "<p class='observacao'>Todos os valores esperados devem ser iguais aos valores obtidos. Não há problemas haver rótulos a mais em valores obtidos.</p>";
}
let arr_avaliable_classes = ["ok",".erro_sitaxe","erro_execucao",
                            "nao_implementado","erro_sintaxe_outro"];
function exibirAviso(numExercicio, classeStatus, strSufixoAviso){
    let strNumExercicio = (numExercicio+"").replaceAll(".","\\.");
    $(`#teste-ex${strNumExercicio}>div`).addClass("escondido");
    $(`#teste-ex${strNumExercicio}-${strSufixoAviso}`).removeClass("escondido");
    
    //coloca cores nos avisos e no label
    for(let strAvStatusClass of arr_avaliable_classes){
        $(`#statusTeste${strNumExercicio}`).removeClass(strAvStatusClass);
        $(`#result-teste${strNumExercicio}`).removeClass(strAvStatusClass);
    }
    $(`#statusTeste${strNumExercicio}`).addClass(classeStatus);
    $(`#result-teste${strNumExercicio}`).addClass(classeStatus);

    const totalDeExecucoes = numExecucaoExercicio[numExercicio] ? Object.keys(numExecucaoExercicio[numExercicio]).reduce((soma, strFuncao) => soma + numExecucaoExercicio[numExercicio][strFuncao], 0) : 0
    const totalDeExecucoesCertas = numExecucaoOKExercicio[numExercicio] ? Object.keys(numExecucaoOKExercicio[numExercicio]).reduce((soma, strFuncao) => soma + numExecucaoOKExercicio[numExercicio][strFuncao], 0) : 0
    let strNum = `${totalDeExecucoesCertas}/${totalDeExecucoes}`
    $(`#result-teste${strNumExercicio}`).html(strNum);

}
function desenhaTestes(){
    let numExsPorUnid = [2, 6, 5];
    let numAquecimentoPorUnid = [3, 2, 2];

    let exercicioAtual = 1;
    let aquecimentoAtual = 1;

    let arrExs = [[],[],[]];
    for(let unidade=0; unidade<=numExsPorUnid.length; unidade++){
        let numExs = numExsPorUnid[unidade];
        let numAquecimentos = numAquecimentoPorUnid[unidade];

        let numExercicioAq,numExercicio;
        for(let aq=0; aq<numAquecimentos; aq++){
            numExercicioAq = (aquecimentoAtual+aq)/10;
            arrExs[unidade].push(numExercicioAq);
            
        }
        aquecimentoAtual = numExercicioAq*10+1;
        for(let ex=0; ex<numExs; ex++){
            numExercicio = (exercicioAtual+ex);
            arrExs[unidade].push(numExercicio);
        }
        exercicioAtual = numExercicio+1;
    }

    //desenha a tabela de testes
    let progressoExerciciosEl = document.querySelector("#status-exercicios");

    for(let unidade=0; unidade<numExsPorUnid.length; unidade++){
        let celUnidade = document.createElement("div");
        celUnidade.classList.add('status-unidade')
        progressoExerciciosEl.appendChild(celUnidade);

        for(let numExercicio of arrExs[unidade]){
            const celStatusEl = document.createElement('span');
            celStatusEl.dataset.mostraTeste = "teste-ex" + numExercicio;
            celStatusEl.innerHTML = numExercicio;
            celStatusEl.id = `statusTeste${numExercicio}`;
            celStatusEl.classList.add("erro_sintaxe_outro");
            celStatusEl.classList.add('status-exercicio');
            celUnidade.appendChild(celStatusEl);
        }
    }

    //desenha apresentação do teste
    let saidaTestes = document.getElementById("saidaTestes");
    for(let unidade=0; unidade<numExsPorUnid.length; unidade++){
        for(let numExercicio of arrExs[unidade]){
            let containerEl = document.createElement("aside");
            //let tituloEl = document.createElement("h3");
            let divNaoExisteEl = document.createElement("div");
            let divNaoImplementadoEl = document.createElement("div");
            let divErroSintaxeEl = document.createElement("div");
            let divSintaxeOutroEl = document.createElement("div");
            let divConteudoTesteEl = document.createElement("div");
            
            //tituloEl.innerHTML = `Exercício ${numExercicio}`;
            divNaoExisteEl.innerHTML = "Não foi feito teste automatizado para este exercício.";
            divNaoImplementadoEl.innerHTML = "A função deste exercício ainda não foi implementada. Caso tenha implementado, verifique se o nome dela está correto, conforme pedido no enunciado (inclusive maiúsculas e minusculas).";
            divErroSintaxeEl.innerHTML = "Há um erro de sintaxe nesta função. Favor pressionar <kbd>F12</kbd> para depurá-lo.";
            divSintaxeOutroEl.innerHTML = "A função de algum exercício anterior deve estar com erro de sintaxe e atrapalhando esta.";

            containerEl.id = `teste-ex${numExercicio}`;
            containerEl.classList.add("saidaTeste");
            containerEl.title = `Verificando o Exercício ${numExercicio}`
            
            divNaoExisteEl.id = `teste-ex${numExercicio}-nao-existe`;
            divNaoExisteEl.classList.add("aviso");
            divNaoExisteEl.classList.add("escondido");

            divNaoImplementadoEl.id = `teste-ex${numExercicio}-nao-implementado`;
            divNaoImplementadoEl.classList.add("aviso");
            divNaoImplementadoEl.classList.add("escondido");

            divErroSintaxeEl.id = `teste-ex${numExercicio}-erro-sitaxe`;
            divErroSintaxeEl.classList.add("aviso");
            divErroSintaxeEl.classList.add("escondido");

            divSintaxeOutroEl.id = `teste-ex${numExercicio}-erro-sitaxe-outro`;
            divSintaxeOutroEl.classList.add("aviso");

            divConteudoTesteEl.id = `teste-ex${numExercicio}-conteudo`;
            divConteudoTesteEl.classList.add("conteudo-teste");
            divConteudoTesteEl.classList.add("escondido");

            //containerEl.appendChild(tituloEl);
            containerEl.appendChild(divNaoExisteEl);
            containerEl.appendChild(divNaoImplementadoEl);
            containerEl.appendChild(divErroSintaxeEl);
            containerEl.appendChild(divSintaxeOutroEl);
            containerEl.appendChild(divConteudoTesteEl);
            saidaTestes.appendChild(containerEl);

            //acordions
            /*let strExercicio = (numExercicio+"").replaceAll(".","\\.")
            $( `#teste-ex${strExercicio}-conteudo` ).accordion({
                collapsible: true
            });
            */

        }

    }
    //modais e disparadores dos modais
    dialog = $( ".saidaTeste" ).dialog({
        autoOpen: false,
        height: 500,
        width: 550,
        modal: true,
        open: function(e){
            let idDialog = (e.target.id+"-conteudo").replaceAll(".","\\.");
            $("#"+idDialog).accordion({
                collapsible: true,
                active: false,
            });
          }
    });

    
    //evento dos botoes de dialogos 
    let disparadores = [...document.querySelectorAll('[data-mostra-teste')];
    for(let botao of disparadores){
        botao.classList.add("erro_sintaxe_outro");
        botao.addEventListener("click", function(e){
            let curBotaoDisparador = e.currentTarget;
            let idDialogTestToOpen = curBotaoDisparador.dataset.mostraTeste.replaceAll(".","\\.");
            $( "#"+idDialogTestToOpen ).dialog( "open" );
        });
    }

}