// Consegna
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

function createCells(numberCell, boxClass) {
    let tempString = ``;
    for (let i = 1; i <= numberCell; i++) {
        tempString += `
        <div class="ms_box ms_box-${boxClass}">
            <span class="ms_box-number">${i}</span>
        </div>`
    }
    document.getElementById('container-game').innerHTML = tempString;
    document.getElementById('result').innerHTML = '';
}

function createGame(difficulty) {
    if (difficulty == 'easy') {
        createCells(100, 'easy');
    }else if (difficulty == 'medium') {
        createCells(81, 'medium');
    }else {
        createCells(49, 'hard');
    }
    gameEnded = false;
}

function isNotIn (number, list) {
    for (let i = 0; i < list.length; i++) {
        if (number == list[i]) {
            return false;
        }      
    }
    return true;
}

function generateBombs(difficulty) {
    let number;
    if (difficulty == 'easy') {
        number = 100;
    }else if (difficulty == 'medium') {
        number = 81;
    }else {
        number = 49;
    }
    const bombsList = [];
    while (bombsList.length < 16) {
        const randomInt = Math.floor(Math.random()* number + 1);
        if (isNotIn(randomInt, bombsList)) {
            bombsList.push(randomInt);
        }
    }
    console.log(bombsList);
    return bombsList;
}

function showBombs(bombsList) {
    let boxs = document.querySelectorAll('main #container-game .ms_box');
    for (let i = 0; i < boxs.length; i++) {
        if (!isNotIn(boxs[i].querySelector('.ms_box-number').textContent, bombsList)) {
            boxs[i].classList.add('ms_box-show-bomb');
        }
    }
}

function stopGame() {
    gameEnded = true; 
}

function selectBox(bombsList) {
    let boxs = document.querySelectorAll('main #container-game .ms_box');
    let succes = 0;
    for (let i = 0; i < boxs.length; i++) {
        boxs[i].addEventListener('click', function () {

            if( gameEnded ) {
                return; 
            }    

            const boxIndex = this.querySelector('.ms_box-number').textContent;
            if (isNotIn(boxIndex, bombsList)) {
                if (!this.classList.contains('ms_box-active')) {
                    this.classList.add('ms_box-active');
                    succes += 1;
                }
            }else {
                showBombs(bombsList);
                document.getElementById('result').innerHTML = `Peccato hai perso :-( Hai azzeccato: ${succes} tentativi. Gioca ancora...`;
                stopGame();
            }
            console.log(succes);
            if (succes == boxs.length - 16) {
                document.getElementById('result').innerHTML = `Hai vinto! Hai azzeccato: ${succes} tentativi. Gioca ancora...`;
                stopGame();
            }
        });
    }
}

const difficultySelector = document.getElementById('difficulty-selector');
const playButton = document.getElementById('play-button');
let gameEnded = false; 

playButton.addEventListener('click', function() {
    createGame(difficultySelector.value);
    const bombsList = generateBombs(difficultySelector.value);
    selectBox(bombsList);  
});