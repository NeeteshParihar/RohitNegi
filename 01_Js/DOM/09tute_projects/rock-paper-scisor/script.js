const playerA = document.querySelector(".playerA");
const playerB = document.querySelector(".playerB");

const checkButton = document.querySelector(".check");
const resetButton = document.querySelector(".reset");
const resultPara = document.querySelector(".result");

let playerAHandSign = null;
let playerBHandSign = null;

const Pending = "Pending";
const DRAW = "DRAW";

const move = {
    rock: "rock",
    paper: "paper",
    scissor: "scissor"
};

function isGamePending() {
    return playerAHandSign === null || playerBHandSign === null;
}

function displayResult(message) {
    resultPara.innerHTML = message;
}

function getTargetHandSign(event) {
    return event.target;
}

function getPlayer(node) {
    return node.parentElement;
}

function getMove(handSign) {
    return handSign.dataset.move;
}

function isDraw() {
    return getMove(playerAHandSign) === getMove(playerBHandSign);
}

function isWinningMove(moveA, moveB) {
    return (
        (moveA === move.rock && moveB === move.scissor) ||
        (moveA === move.scissor && moveB === move.paper) ||
        (moveA === move.paper && moveB === move.rock)
    );
}

function getWinner() {
    const playerAMove = getMove(playerAHandSign);
    const playerBMove = getMove(playerBHandSign);

    return isWinningMove(playerAMove, playerBMove) ? "Player A" : "Player B";
}

function getGameStatus() {
    if (isGamePending()) return Pending;
    if (isDraw()) return DRAW;
    return getWinner();
}

function handleMove(event) {


    const handSign = getTargetHandSign(event);
    if (handSign.tagName !== "IMG") return;

    const player = getPlayer(handSign);

    if (player === playerA) {
        if (playerAHandSign) playerAHandSign.classList.remove("selected");
        playerAHandSign = handSign;
        playerAHandSign.classList.add("selected") ;
    } else {
        if (playerBHandSign) playerBHandSign.classList.remove("selected");
        playerBHandSign = handSign;
        playerBHandSign.classList.add("selected") ;

    }
}

function removeSelectionHighlights() {
    document.querySelectorAll(".selected").forEach(img =>
        img.classList.remove("selected")
    );
}

function removeClickEvents() {
    playerA.removeEventListener("click", handleMove);
    playerB.removeEventListener("click", handleMove);
}


function addClickEvents() {
    playerA.addEventListener("click", handleMove);
    playerB.addEventListener("click", handleMove);
}

function resetGame() {

    removeSelectionHighlights();
    
    displayResult("") ;

    const status = getGameStatus() ;

    if(status != Pending)
        addClickEvents();

    playerAHandSign = null;
    playerBHandSign = null;
}

function init() {

    addClickEvents();

    checkButton.addEventListener("click", () => {
        
        const status = getGameStatus();

        if (status === Pending) {
            displayResult("Game is still pending...");
        } else if (status === DRAW) {
            displayResult("It's a Draw!");
            removeClickEvents();
        } else {
            displayResult(`Winner is ${status}`);
            removeClickEvents();
        }
    });

    resetButton.addEventListener("click", resetGame);
}

init();
