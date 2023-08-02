function exibeExercicio(numUnidadeEnsino, numExercicio, ehDesafio) {
    let arrExerciciosEl = document.querySelectorAll("section");
    let arrMenuExerciciosEl = document.querySelectorAll("nav li");

    for(let i = 0; i < arrExerciciosEl.length; i++) {
        arrExerciciosEl[i].style.display = "none";
    }

    for(let i = 0; i < arrMenuExerciciosEl.length; i++) {
        if (arrMenuExerciciosEl[i].dataset.numExercicio == numExercicio && arrMenuExerciciosEl[i].dataset.numUnidadeEnsino == numUnidadeEnsino) {
            arrMenuExerciciosEl[i].classList.add("selecionado");
        } else {
            arrMenuExerciciosEl[i].classList.remove("selecionado");
        }
    }
    arrExerciciosEl[numExercicio].style.display = "";
    if (ehDesafio) {
        arrExerciciosEl[numExercicio].querySelector("h2").dataset.desafio = true;
    }
}

function exibeAquecimentoUnidadeEnsino(unidadeEnsino) {
    let aquecimentoDivEl = null;
    for(let i = 1 ; i <= 3;  i++){
        aquecimentoDivEl = document.querySelector("#aquecimento-unidade" + i);
        if (i != unidadeEnsino){
            aquecimentoDivEl.style.display = "none";
        } else {
            aquecimentoDivEl.style.display = "";
        }
    }
    
}
function clicouExercicio(event) {
    let itemClicado = event.currentTarget;
    let numExercicio = itemClicado.dataset.numExercicio;
    let numUnidadeEnsino = itemClicado.dataset.numUnidadeEnsino;
    let ehDesafio = itemClicado.dataset.desafio;

    exibeExercicio(numUnidadeEnsino, numExercicio, ehDesafio);
    if(itemClicado.dataset.numExercicio == 0){
        exibeAquecimentoUnidadeEnsino(numUnidadeEnsino);
    }
    
    localStorage.setItem('ultimoExercicio', numExercicio);
    localStorage.setItem('ultimaUnidadeEnsino', numUnidadeEnsino);
    localStorage.setItem('ultimoEhDesafio', ehDesafio);
}

function criaMenu(numUnidadeEnsino, arrNumExericios, desafios = []) {
    //cria a menu
    let menuExerciciosEl = document.querySelector("#unidade" + numUnidadeEnsino + " nav ul");
    arrNumExericios.unshift(0);
    for (let numExercicio of arrNumExericios) {
        let listMenuItens = document.createElement("li");
        if (numExercicio == 0){
            listMenuItens.innerHTML = "Aquecimento";
            
        } else {
            listMenuItens.innerHTML = numExercicio;
        }
        listMenuItens.dataset.numExercicio = numExercicio;
        listMenuItens.dataset.numUnidadeEnsino = numUnidadeEnsino;
        if (desafios.includes(numExercicio)) {
            listMenuItens.dataset.desafio = true;
        } 
        listMenuItens.addEventListener("click", clicouExercicio);
        menuExerciciosEl.appendChild(listMenuItens);
    }
}
function exibeItemSelecionado() {
    //exibe o item previamente selecionado (se existir)
    let numExercicio = localStorage.getItem('ultimoExercicio');
    let numUnidadeEnsino = localStorage.getItem('ultimaUnidadeEnsino');
    let ehDesafio = localStorage.getItem('ultimoEhDesafio') === 'true';

    if (numExercicio == null) {
        numExercicio = 0;
        numUnidadeEnsino = 1;
        ehDesafio = false;
    }
    exibeExercicio(numUnidadeEnsino, numExercicio, ehDesafio);
    if(numExercicio == 0) {
        exibeAquecimentoUnidadeEnsino(numUnidadeEnsino);
    }
}



// function configuraMenuSticky(stuckSelector) {
//     const stuckEl = document.querySelector(stuckSelector)
//     const observer = new IntersectionObserver(
//         ([e]) => stuckEl.toggleAttribute('stuck', e.intersectionRatio < 1),
//         { threshold: [1] }
//     );
    
//     observer.observe(stuckEl);
// }

criaMenu(1,[1,2]);
criaMenu(2,[3,4,5,6,7,8], [7, 8]);
criaMenu(3,[9,10,11,12,13], [11]);
exibeItemSelecionado();
// configuraMenuSticky('#status-exercicios')