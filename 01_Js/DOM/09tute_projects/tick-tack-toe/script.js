const PLAYER_O = "O";
const PLAYER_X = "X";
const EMPTY = "E";

const boardContainer = document.querySelector(".board");
const restartButton = document.querySelector("button");
const resultContainer = document.querySelector("#result");
const playerA = document.querySelector(".playerA");
const playerB = document.querySelector(".playerB");

let turn = PLAYER_O;
let totalTurns = 0;

const board = new Array(9).fill(EMPTY);

const winners = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function resetUI(){

    const UIblocks = boardContainer.querySelectorAll("div");
    for (let block of UIblocks) {
        block.innerHTML = "";
        block.className = "";
    }

}

function resetBoard(){
    board.forEach((_, index) => {
        board[index] = EMPTY;
    });
}

function restart() {
    updateTurn(PLAYER_X);
    updateTotalTurns(0);

    resetBoard() ;
    resetUI() ;   

    resultContainer.innerHTML = "";
}

function updateTurn(currentTurn) {
    turn = (currentTurn === PLAYER_X) ? PLAYER_O : PLAYER_X;
}

function updateTotalTurns(newTurns) {
    totalTurns = newTurns;
}

function updateBoard(index, value) {
    board[index] = value;
}

function checkWin() {
    for (let [a, b, c] of winners) {
        if (board[a] === EMPTY) continue;
        if (board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return totalTurns === 9;
}

function gameStatus() {
    if (checkWin()) return "WON";
    if (checkDraw()) return "DRAW";
    return "none";
}

function getTarget(event) {
    return event.target;
}

function getAttribute(element, attr) {
    return element.getAttribute(attr);
}

function updatePlayerIndicator() {
    playerA.querySelector("img").classList.toggle("big", turn === PLAYER_O);
    playerB.querySelector("img").classList.toggle("big", turn === PLAYER_X);
}

const gameMover = (event) => {
    const target = getTarget(event);
    const index = getAttribute(target, "id");

    if (board[index] !== EMPTY) return;

    target.textContent = turn;
    updateBoard(index, turn);

    if (turn === PLAYER_O) {
        target.classList.add("green");
    } else {
        target.classList.add("blue");
    }

    updatePlayerIndicator();

    const prevTurn = turn;
    updateTurn(turn);
    updateTotalTurns(totalTurns + 1);

    const status = gameStatus();

    console.log(status);

    if (status === "WON") {
        resultContainer.innerHTML = `${prevTurn} won`;
        boardContainer.removeEventListener("click", gameMover);
    } else if (status === "DRAW") {
        resultContainer.innerHTML = `Match DRAW`;
        boardContainer.removeEventListener("click", gameMover);
    }
};

function init() {
    boardContainer.addEventListener("click", gameMover);

    restartButton.addEventListener("click", () => {
        const status = gameStatus();
        if (status === "WON" || status === "DRAW") {
            boardContainer.addEventListener("click", gameMover);
        }
        restart();
    });
}

init();
