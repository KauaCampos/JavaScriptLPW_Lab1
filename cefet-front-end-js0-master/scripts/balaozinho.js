const baloezinhos = [...document.querySelectorAll('.balaozinho')];
const disparadores = [...document.querySelectorAll('[data-mostra-balaozinho')];
const mascaraEl = document.querySelector('#mascara-balaozinho');

disparadores.forEach(el => {
    const qualBalaozinho = el.dataset.mostraBalaozinho;
    el.addEventListener('click', e => {
        const balaozinhoEl = baloezinhos.find(el => qualBalaozinho === el.id);
        mascaraEl.classList.add('visivel');        
        balaozinhoEl.classList.add('visivel');
        document.body.classList.add('mascara-visivel');
        el.style.zIndex = 100;
        let tipEl = balaozinhoEl.querySelector('.tip');
        if (!tipEl) {
            tipEl = document.createElement('div');
            tipEl.className = 'tip';
            balaozinhoEl.appendChild(tipEl);
        }

        const tamanhoDisparador = el.getBoundingClientRect()
        const larguraTela = window.innerWidth;
        const balaozinhoLeft = Math.max(0, Math.min(larguraTela - balaozinhoEl.offsetWidth, (tamanhoDisparador.left - (balaozinhoEl.offsetWidth - el.offsetWidth) / 2)));
        balaozinhoEl.style.left = balaozinhoLeft + 'px';
        balaozinhoEl.style.top = `calc(${tamanhoDisparador.top - balaozinhoEl.offsetHeight}px - 1em)`;
        balaozinhoEl.style.transform = `translateY(${balaozinhoEl.offsetHeight}px) scale(0.1)`;
        tipEl.style.left = ((-10 + tamanhoDisparador.left + el.offsetWidth / 2 - balaozinhoLeft) / balaozinhoEl.offsetWidth * 100) + '%';

        const TRANSITION_DURATION = 200;
        setTimeout(() => {
            balaozinhoEl.style.transform = `scale(1) translateY(0)`;
            balaozinhoEl.style.transition = `all ${TRANSITION_DURATION}ms ease-out`;
            setTimeout(() => {
                balaozinhoEl.style.transition = `none`;
            }, TRANSITION_DURATION);
        }, 1);
    });
});

mascaraEl.addEventListener('click', e => {
    e.currentTarget.classList.remove('visivel');
    baloezinhos.forEach(el => el.classList.remove('visivel'));
    document.body.classList.remove('mascara-visivel');
    disparadores.forEach(el => el.style.zIndex = 'initial');
});

