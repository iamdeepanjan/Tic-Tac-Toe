const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".statusText");
const restart = document.querySelector(".restart");

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell=>cell.addEventListener('click', cellClicked));
    restart.addEventListener('click', restartGame);
    statusText.textContent = `${player}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);    
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = player;
    cell.textContent = player;
}

function changePlayer() {
    player = (player == "X") ? "O" : "X";
    statusText.textContent = `${player}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    for(let i=0; i<winningPatterns.length; i++) {
        const pattern = winningPatterns[i];
        let a = options[pattern[0]];
        let b = options[pattern[1]];
        let c = options[pattern[2]];

        if(a=="" || b=="" || c=="") {
            continue;
        }
        if(a == b && b == c) {  
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `${player} wins`;
        running = false;
    }

    else if(!options.includes("")) {
        statusText.textContent = `Draw`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    player = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${player}'s turn`;
    cells.forEach(cell=>cell.textContent = "");
    running = true;
}