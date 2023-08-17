function eliminaCaracteres(texto, caracteresParaEliminar) {
    for (let caractere of caracteresParaEliminar) {

    }
    
    
    return texto;
}


function substituiCaracteres(texto, caracteresProcura, caracteresSubstituirPor) {
    for(let i = 0; i < caracteresProcura.length; i++) {
        let caractereProcura = caracteresProcura[i];
        let caractereSubstituirPor = caracteresSubstituirPor[i];
        
    }
    
    
    return texto;
}

function inverteTexto(texto) {
    let textoInvertido = '';


    return textoInvertido;
}



function dizOiPara(funcaoDeDarOi, nomeDaPessoa) {
    
    // veja que aqui, independente do nome da função
    // externa, invocamos ela como funcaoDeDarOi
    textoDoOi = funcaoDeDarOi(nomeDaPessoa);
    
    escrevaMensagem(12, '=========== Início do chat ===========');
    escrevaMensagem(12, textoDoOi);
    escrevaMensagem(12, '======================================');
    escrevaMensagem(12, '<br>');
}


function oiEmPortuguesFormal(nome) {
    return 'Oi Sr(a). ' + nome + ', como vai?';
}

let oiEmPortugues = function(nome) {
    return 'Oi ' + nome + ', blza?';
};


// dá oi para 'Daniel' de várias formas diferentes
dizOiPara(oiEmPortuguesFormal, 'Daniel');
dizOiPara(oiEmPortugues, 'Daniel');
dizOiPara(function(nome) {
    return 'Hi ' + nome + ', how are you?';
}, 'Daniel');


//exercicio 0.6
function metodosVetor (vetor) {
    let quantidade = 0;
    vetor.forEach (function (vetor) {
        quantidade++;
    })

    let aux;
    for (let i = 0; i < quantidade; i++)
        for (let j = 0; j < quantidade; j++) 
            if (vetor [i] > vetor [j] && i < j) {
                aux = vetor [i];
                vetor [i] = vetor [j];
                vetor [j] = aux;
            }


    vetor [0] = 'abacate';
    return vetor;
}

let ordem = [1, 2, 5, 4]
escreva (0.6, 'vetor', metodosVetor (ordem));