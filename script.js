const cards = document.querySelectorAll('.card')

let hasFlipCard = false
let bloquearTabuleiro = false
let firstCard, secondCard

let contadorDeAcertos = 0
let contadorDeTentativas = 0

function virarCarta() {
    if(bloquearTabuleiro) return
    if(this === firstCard) return

    this.classList.add('virar')
    
    if(!hasFlipCard) {
        hasFlipCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlipCard = false
    validarCartas()
}

function validarCartas() {
    contadorDeTentativas++
    if(firstCard.dataset.card === secondCard.dataset.card) {
        contadorDeAcertos++
        desabilitarCartas()
        return
    } else {
        desvirarCartas()
    }
}

function desabilitarCartas() {
    firstCard.removeEventListener('click', virarCarta)
    secondCard.removeEventListener('click', virarCarta)
    
    resetarTabuleiro()

    if(contadorDeAcertos > 5) {
        encerrarJogo()
    }
}

function desvirarCartas() {
    bloquearTabuleiro = true
    setTimeout(() => {
        firstCard.classList.remove('virar');
        secondCard.classList.remove('virar');
        
        resetarTabuleiro()
    }, 1000)
}

function resetarTabuleiro() {
    [hasFlipCard, bloquearTabuleiro] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function embaralhar() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        
        card.style.order = randomPosition
    })
})()

function encerrarJogo() {
    document.getElementById('tentativas').innerHTML = contadorDeTentativas

    let alertaDeFimDeJogo = document.getElementsByClassName('fim-de-jogo')
    setTimeout(() => {
        alertaDeFimDeJogo[0].style.display = 'block';
    }, 500)
}

function recomecarJogo() {
    location.reload()
}

cards.forEach((card) => {
    card.addEventListener('click', virarCarta)
})


