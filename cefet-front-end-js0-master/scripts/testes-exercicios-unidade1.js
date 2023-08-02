

  $( function() {

    exibirAviso(0.1, "nao_existe", "nao-existe");
    
    let arrParametros;
    let arrObjValoresEsperados;

    //Exercicio 0.2
    arrParametros = [[2,3],[-1,0],[-1,-4]];
    arrObjValoresEsperados = [{"":5,"soma":5},
                                {"":-1,"soma":-1},
                                {"":-5,"soma":-5},
                                ];
    testaExecucoes(0.2, "soma", arrParametros, arrObjValoresEsperados,true);


    //Exercicio 0.3
    arrParametros = [[4],[9],[0]];
    arrObjValoresEsperados = [{"quadrado":16,"metade":2,"raiz":2},
                                {"quadrado":81,"metade":4.5,"raiz":3},
                                {"quadrado":0,"metade":0,"raiz":0},
                                ];
    testaExecucoes(0.3, "calculaValoresDoNumero", arrParametros, arrObjValoresEsperados,true);

    //Exercicio 1
    arrParametros = [[0, 5, 20],[1, 10, 10],[2, 10, 10],
                      [4,5,12],[4,7,12],[2, -10, 4]];
    arrObjValoresEsperados = [{"":0},
                                {"":5},
                                {"":0},
                                {"":-76},
                                {"":-68},
                                {"":-28},
                                ];
    testaExecucoes(1, "calculaAlturaBola", arrParametros, arrObjValoresEsperados,false);

    //Exercicio 2
    arrParametros = [[0, 5, 20],[1, 10, 10],[2, 10, 10]];
    arrObjValoresEsperados = [{"":5},
                                {"":0},
                                {"":-10}
                              ];
    testaExecucoes(2, "calculaVelocidadeBola", arrParametros, arrObjValoresEsperados,false);
    
  } );