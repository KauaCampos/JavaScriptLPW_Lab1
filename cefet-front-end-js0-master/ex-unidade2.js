function contandoElementosDoVetor(elementos, elementoSendoProcurado) {
    let quantidade = 0;
    for (let elemento of elementos) {
        if (elemento === elementoSendoProcurado)
            quantidade++;
    }
    
    return quantidade;
}

contandoElementosDoVetor([1, 5, 5], 5);                  // retorna 2
contandoElementosDoVetor(['daniel', 'flávio'], 'joão');  // retorna 0

function obtemNomeDoMes(numero) {
    if (numero < 1 || numero > 12) {
        escrevaMensagem(0.5, 'Mês inválido: ' + numero);
        return null;
    }
    
    let meses = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];

    return meses[numero - 1];
}
escreva (0.5, 'mes', obtemNomeDoMes(0));
escreva (0.5, 'mes', obtemNomeDoMes(12));
escreva (0.5, 'mes', obtemNomeDoMes(-500));

//exercicio 7
function fibonacci(tamanhoSequencia) {
    let sequencia = [];
    switch (tamanhoSequencia) {
    case 0: 
        escreva(7, 'Fib(' + tamanhoSequencia + ')', sequencia);
        return sequencia;
    case 1:
        sequencia.push (0);
        escreva(7, 'Fib(' + tamanhoSequencia + ')', sequencia);
        return sequencia;
    default: 
        sequencia.push (0, 1); 
        for (let i = 2; i < tamanhoSequencia; i++)
            sequencia.push (sequencia [i - 1] + sequencia [i - 2]);

        escreva(7, 'Fib(' + tamanhoSequencia + ')', sequencia);
        return sequencia;
    }
}

fibonacci (7);


//exercicio 3
function calculaVelocidadeAlturaBola(velocidadeInicial, gravidade, n) { 
    
    for (let tempo = 1; tempo <= n; tempo++) {

        let velocidade = calculaVelocidadeBola(tempo, velocidadeInicial, gravidade);
        let altura = calculaAlturaBola(tempo, velocidadeInicial, gravidade);

        escreva(3,'v(' + tempo + ')', velocidade);
        escreva(3,'h(' + tempo + ')', altura);
    }
}

calculaVelocidadeAlturaBola(50, 9.81, 20);


//exercicio 4
function somatorio (inteiro) {
    let soma = 1/2;
    if (inteiro === 1)
        return 0;

    if (inteiro <= 3) 
        return soma;

    for (let divisor = 4; divisor <= inteiro; divisor+=2) 
        soma += 1/divisor;
    
    return soma;
}

somatorio (1);
somatorio (10);
somatorio (100);

//exercicio 5
function obtemPosicaoDoElemento (vetor, elemento) {
    let posicao = null;
    let i = - 1
    vetor.forEach (function (frutas) {
        i++;
        if (frutas === elemento)
            posicao = i;
    })

    return posicao;
}

let frutas = ['Pera', 'Uva', 'Abacaxi', 'Cenoura'];
escreva(5, 'posicao', obtemPosicaoDoElemento (frutas, 'Uva'));

//exercicio 6
function calculaMediaEntreExtremos(vetorDeNumeros) {
    let minimo = vetorDeNumeros [0], maximo = vetorDeNumeros [1], aux, quantidade = 0;
    if (minimo > maximo) {
        aux = minimo;
        minimo = maximo;
        maximo = aux;
    }

    vetorDeNumeros.forEach (function (vetor) {
        quantidade++;
    })

    if (quantidade === 1)
        return vetorDeNumeros [0];

    for (let i = 2; i < quantidade; i++) {
        if (vetorDeNumeros [i] > maximo) {
            maximo = vetorDeNumeros [i];
            continue;
        }

        if (vetorDeNumeros [i] < minimo) 
            minimo = vetorDeNumeros [i];
    }

    let media = (minimo + maximo) / 2;
    return media;
}

let vetor = [3, -2, 12];
escreva (6, 'media', calculaMediaEntreExtremos (vetor));

//exercicio 8
let pessoas = ['Alice', 'Bob', 'Carol', 'Daniele'];
let amizades = [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0, 0, 1], [1, 1, 0, 0]];

function exibeAmigos (pessoas, amizades, nome) {
    let amigos = [], posicaoNome = obtemPosicaoDoElemento (pessoas, nome);
    const quantidadePessoas = pessoas.length;

    for (let i = 0, quant = 0; i < quantidadePessoas; i++) {
        if (i === posicaoNome)
            continue;

        if (amizades [posicaoNome] [i] === 1 && quant === 0) {
            amigos = [pessoas [i]];
            quant ++;
            continue;
        }

        if (amizades [posicaoNome] [i] === 1)
            amigos.push (pessoas [i]);
    }

    escrevaMensagem (8, "Amigos de " + nome);
    escreva (8, "amigos", amigos);
    return amigos;
}

function exibeAmigosEmComum (pessoas, amizades, pessoa1, pessoa2) {
    const quantidadePessoas = pessoas.length;
    posicaoPessoa1 = obtemPosicaoDoElemento (pessoas, pessoa1);
    posicaoPessoa2 = obtemPosicaoDoElemento (pessoas, pessoa2);
    let amigos = [];

    for (let i = 0, quant = 0; i < quantidadePessoas; i++) {
        if (i == posicaoPessoa1 || i == posicaoPessoa2)
            continue;

        if (amizades [posicaoPessoa1] [i] === 1 && amizades [posicaoPessoa2] [i] === 1  && quant === 0) {
            amigos = [pessoas [i]];
            quant ++;
            continue;
        }

        if (amizades [posicaoPessoa1] [i] === 1 && amizades [posicaoPessoa2] [i] === 1) 
            amigos.push (pessoas [i]);
    }

    escrevaMensagem (8, "Amigos em comum de " + pessoa1 + " e " + pessoa2);
    escreva (8, "amigos em comum", amigos);

    return amigos;
}

exibeAmigos (pessoas, amizades, 'Bob');
exibeAmigosEmComum (pessoas, amizades, 'Bob', 'Alice');
