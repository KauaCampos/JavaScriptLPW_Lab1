$( function() {

    

    let arrParametros;
    let arrObjValoresEsperados;

    //Exercicio 0.4
    arrParametros = [[[13,21,2,2,1,1,3,4,-2],2],
                      [[13,21,2,2,1,1],-4],
                      [[12,2,2,0],"a"],
                      [[],"a"],
                      [["a","b","a","c","a"],"a"],
                      [["a","b","c"],"d"], 
                      ];
    arrObjValoresEsperados = [{"":2},
                                {"":0},
                                {"":0},
                                {"":0},
                                {"":3},
                                {"":0},
                                ];
    testaExecucoes(0.4, "contandoElementosDoVetor", arrParametros, arrObjValoresEsperados, true);
    

    //exercicio 0.5
    arrParametros = [[1],
                      [7],
                      [0],
                      [-1],
                      [15],
                      [12], 
                      ];
    arrObjValoresEsperados = [{"":"janeiro"},
                                {"":"julho"},
                                {"":null},
                                {"":null},
                                {"":null},
                                {"":"dezembro"},
                                ];
    testaExecucoes(0.5, "obtemNomeDoMes", arrParametros, arrObjValoresEsperados, false);
    
    //exercicio 3
    arrParametros = [[10, 4,6],
                    [-9,7,3]
                      ];
    arrObjValoresEsperados = [
                      {"h(1)":8,"v(1)":6,
                      "h(2)":12,"v(2)":2,
                      "h(3)":12,"v(3)":-2,
                      "h(4)":8,"v(4)":-6,
                      "h(5)":0,"v(5)":-10,
                      "h(6)":-12,"v(6)":-14,
                      },
                      {"h(1)":-12.5,"v(1)":-16,
                      "h(2)":-32,"v(2)":-23,
                      "h(3)":-58.5,"v(3)":-30,
                      }
                    ];
    testaExecucoes(3, "calculaVelocidadeAlturaBola", arrParametros, arrObjValoresEsperados, true);
  
    //exercicio 4
    arrParametros = [[1],
                    [2],
                    [6],
                    [10]
                  ];

    arrObjValoresEsperados = [{"":0},
                              {"":0.5},
                              {"":0.917},
                              {"":1.142}];
    testaExecucoes(4, "somatorio", arrParametros, arrObjValoresEsperados, true);
    

    //exercicio 5
    arrParametros = [
                    [["Pera","Uva","Abacaxi"],"Uva"],
                    [[1,-1,10,20,12],1],
                    [[1,-1,10,20,12],12],
                    [[], 1],
                    [[10,20],14]
                  ];

    arrObjValoresEsperados = [{"":1},
                              {"":0},
                              {"":4},
                              {"":null},
                              {"":null},
                             ];
    testaExecucoes(5, "obtemPosicaoDoElemento", arrParametros, arrObjValoresEsperados, false);
    
    //exercicio 6
    arrParametros = [
      [[3, -2, 12]],
      [[8, 10]],
      [[8]],
      [[10, -10]]
    ];

    arrObjValoresEsperados = [
      {"": 5},
      {"": 9},
      {"": 8},
      {"": 0}
    ];
    testaExecucoes(6, "calculaMediaEntreExtremos", arrParametros, arrObjValoresEsperados, false);

    //exercicio 7
    arrParametros = [
      [0],
      [1],
      [7],
      [10]
    ];
    arrObjValoresEsperados = [{"":[]},
    {"":[0]},
    {"":[0,1,1,2,3,5,8]},
    {"":[0,1,1,2,3,5,8,13,21,34]},
    ];
    testaExecucoes(7, "fibonacci", arrParametros, arrObjValoresEsperados, true);

    //exercicio 8
    //toDO: Não fiz um teste para nome invalido...talvez, valha a pena.
    let pessoas1 = ["alice","bob","carol"];
    let pessoas2 = ["pelé","maradona"];
    let pessoas3 = ["poseidon","thor","afrodite","zeus","atena"];

    let amizades1 = [[0,1,1],
                     [1,0,0],
                     [0,1,0]];
    let amizades2 = [[0,1],
                     [0,0],
                     ];
    let amizades3 = [[0,1,0,1,1],
                     [0,0,1,1,0],
                     [1,1,0,0,0],
                     [0,1,1,0,0],
                     [1,1,1,0,0]
                     ];
    arrParametros = [[pessoas1, amizades1, "bob"],
                      [pessoas2, amizades2, "maradona"],
                      [pessoas3, amizades3, "atena"],
                      [pessoas3, amizades3, "afrodite"],]
    arrObjValoresEsperados = [{"":["alice"]},
                      {"":[]},
                      {"":["poseidon","thor","afrodite"]},
                      {"":["poseidon","thor"]},
                      ];
    testaExecucoes(8, "exibeAmigos", arrParametros, arrObjValoresEsperados, true);
    arrParametros = [[pessoas1, amizades1, "bob", "carol"],
                    [pessoas1, amizades1, "alice", "carol"],
                    [pessoas3, amizades3, "poseidon","thor"],
                    [pessoas3, amizades3, "zeus","atena"]]
    arrObjValoresEsperados = [{"":[]},
                    {"":["bob"]},
                    {"":["zeus"]},
                    {"":["thor","afrodite"]},
                    ];
    testaExecucoes(8, "exibeAmigosEmComum", arrParametros, arrObjValoresEsperados, true);
    

  } );
  