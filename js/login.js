const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if(target.value.length > 3){
        button.removeAttribute('disabled')
        return;
    }

    button.setAttribute('disabled', '')
}

const handleSubmit = (event) => {
    event.preventDefault(); //Bloqueia o evento padrão do formulario
    localStorage.setItem('player', input.value); //Salvando nome do jogador na localStorage

    window.location = '/projetos/memoria-game/pages/game.html';
}

input.addEventListener('input', validateInput); // adicionando evento no campo input
form.addEventListener('submit', handleSubmit); // verificando o momento do click do jogar