function eliminaCaracteres(texto, caracteresParaEliminar) {
    for (let caractere of caracteresParaEliminar) {
        texto = texto.replaceAll (caractere, '');
    }  
    return texto;
}


function substituiCaracteres(texto, caracteresProcura, caracteresSubstituirPor) {
    for(let i = 0; i < caracteresProcura.length; i++) {
        let caractereProcura = caracteresProcura[i];
        let caractereSubstituirPor = caracteresSubstituirPor[i];
        texto = texto.replaceAll (caractereProcura, caractereSubstituirPor);
    }
    return texto;
}

function inverteTexto(texto) {
    let textoInvertido = '';
    for (const char of texto) {
        textoInvertido = char + textoInvertido;
    }
    return textoInvertido;
}

escreva (10, "elimina caracteres", eliminaCaracteres ('aranha', 'a'));
escreva (10, "substitui caracteres", substituiCaracteres('o sapo nao lava o pe', 'aoe', 'iiu'));
escreva (10, "inverte o texto", inverteTexto ('ramo'));

//exercicio 12
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
    let aux, abacate = ['abacate'];
    vetor.sort();
    vetor.pop();
    for (let elemento of vetor) {
        abacate.push (elemento);
    }

    return abacate;
}

let ordem1 = [4, 0, 9];
let ordem2 = [5, 4, 3, 2, 1];
escreva (0.6, 'vetor', metodosVetor (ordem1));
escreva (0.6, 'vetor', metodosVetor (ordem2));

//exercicio 0.7
function metodosString (string) {
    string = string.toUpperCase ();
    string = string.replaceAll ('O', 'A');
    escreva (0.7, 'string', string);
    return string;
}

metodosString ('onibus');

//exercicio 9
function escreveDataPorExtenso (data) {
    const dataSeparada = data.split('/')
    const mesExtenso = obtemNomeDoMes (dataSeparada [1]);
    return dataSeparada [0] + " de " + mesExtenso + " de " + dataSeparada [2];
}

escreva (9, "data", escreveDataPorExtenso ("31/12/2021"));
escreva (9, "data", escreveDataPorExtenso ("07/09/2007"));
escreva (9, "data", escreveDataPorExtenso ("20/08/2023"));

//exercicio 11
function retirarAcentos (string) {
    for (let char of string) {
        if (char == 'á' || char == 'ã') {
            string = string.replaceAll (char, 'a');
        }
        if (char == 'é' || char == 'ê') {
            string = string.replaceAll (char, 'e');
        }
        if (char == 'í') {
            string = string.replaceAll (char, 'i');
        }
        if (char == 'ó' || char == 'ô' || char == 'õ') {
            string = string.replaceAll (char, 'o');
        }
        if (char == 'ú') {
            string = string.replaceAll (char, 'u');
        }
    }

    return string;
}

function verificaPalindromo (string) {
    string = string.toLowerCase ();
    string = retirarAcentos (string);
    let stringSemPontuacoes = '';
    for (let char of string) {
        if (char == '?' || char == '!' || char == ',' || char == ';' || char == '-' || char == ' ')
            continue;
        stringSemPontuacoes += char;
    }
    
    return stringSemPontuacoes === inverteTexto (stringSemPontuacoes);
}

escreva (11, 'palindromo', verificaPalindromo ('A cara rajada da jararaca'));

//exercicio 13
function aplicaOperacaoEmCadaElemento (operacao, vetor1, vetor2) {
    if (vetor1.length != vetor2.length)
        return null;
    
    let vetor = [];
    for (let i = 0; i < vetor1.length; i++) 
        vetor.push (operacao (vetor1 [i], vetor2[i]));

    return vetor;
}

let numeros1 = [4, 2, -1, 10];
let numeros2 = [10, 2, 3, 5];
escreva (13, 'soma',aplicaOperacaoEmCadaElemento (soma, numeros1, numeros2));