// Pegando a div Grid
const grid = document.querySelector('.grid');
// Pegando o Span Player
const spanPlayer = document.querySelector('.player');
// Pegando o contador Time
const timer = document.querySelector('.timer');


// Aray com todos as imgs dos cards 
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

// Arrow Function criando elements, criando tags e class
const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className;
    return element;
}

// Definindo variaveis para validacao se forem == iguais
let firstCard = '';
let secondCard = '';

//Verificando se todas cartas foram desabilitadas 
const checkEndGame = () => {
    //Consulta todos elementos para verificar o tamanho do array
    const disabledCards = document.querySelectorAll('.disabled-card');
    console.log(disabledCards)
    if (disabledCards.length == 20) {
        setTimeout(() => {
            clearInterval(this.loopTime);
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
        }, 270)
    }
}


// Checkando se cards são iguais
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if ( firstCharacter == secondCharacter) {
        // Disabilitado a carta, pois foi correta e bloqueio a frente dela
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        // Remove class de carta revelada e limpa firstCard e secondCard;
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 300)

    }
}

// arrow function adicionando a class reveal-card
const revealCard = ({ target }) => {

    //verifica se carta ja foi revelada
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    // Primeiro Click na carta
    if (firstCard == ''){
        target.parentNode.className.includes('reveal-card');
        firstCard = target.parentNode;
    } else if ( secondCard == '') { // Segunda carta
        target.parentNode.className.includes('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add('reveal-card')
}

// Arrow Function criando cards
const createCard = (character) => {

    // Criando as Divs
    const card = createElement('div', 'card');
    const front =  createElement('div', 'face front');
    const back =  createElement('div', 'face back');

    // Passando dinamico cada personagem no background do card
    front.style.backgroundImage = `url('../images/${character}.png')`;

    // Passando os filhos dentro do pai
    card.appendChild(front);
    card.appendChild(back);

    //Quando clicar no card criado, adiciona a class revealCard na carta
    card.addEventListener('click', revealCard);
    //Passando atributo com nome do personagem para validação de checkCards Iguais
    card.setAttribute('data-character', character);
    return card;
}

// Carrega o jogo
const loadGame = () => {
    // Pegou o array e espalhou no duplicate
    const duplicateCharacters = [ ...characters, ...characters ]; 

    // Embaralhando o array, para vir dinamico a posição das imgs
    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5);

    // Retorna entre 0 e 1 e passamos o  - 0.5 para calcular > 0 ou < 0 
    // Math.random() - 0.5; 

    shuffledArray.forEach((character) => {
        // Criando uma carta para cada personagem
        const card = createCard(character);
        grid.appendChild(card);
    })
}

//Contador do time
const startTimer = () => {

    //pegando o tempo atual do meu timer (+ na frente converte o html em int)
    this.loopTime = setInterval(() => {
                        const currentTime = +timer.innerHTML;
                        timer.innerHTML = currentTime + 1;
                    },1000);
    
}

window.onload = () => {
    // Recuperando o nome do player salvo na LocalStorage e atribuindo ao span Plater
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}





