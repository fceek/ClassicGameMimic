let difficulty;
let startButton;
let resetButton;
let gameArea;
let gameSet = false;
let gameBoard = [];

window.onload = function() {
    startButton = document.querySelector(".startGame");
    resetButton = document.querySelector(".resetGame");
    gameArea = document.querySelector(".gameBody");
    startButton.addEventListener("click",generateGame);
    resetButton.addEventListener("click",resetGame);
};

function resetGame() {
    if (gameSet) {
        gameArea.innerHTML = "";
        gameSet = false;
    }
};

function generateGame() {
    if (!gameSet) {
        gameSet = true;
        difficulty = document.querySelector(".diff").value;
        let sizeX, sizeY, mineNum;
        switch (difficulty) {
            default:
            case "Easy":
                sizeX = 8;
                sizeY = 8;
                mineNum = 10;
                break;
            case "Medium":
                sizeX = 16;
                sizeY = 16;
                mineNum = 40;
                break;
            case "Hard":
                sizeX = 32;
                sizeY = 16;
                mineNum = 99;
                break;
        }
        generatePattern(sizeX, sizeY, mineNum);
        generateGrid(sizeX, sizeY);
    }
};

function generatePattern(_X,_Y,_N) {

    /* test if the difficulty choice runs correctly

    let paraIndicator = document.createElement("p");
    gameArea.appendChild(paraIndicator);
    paraIndicator.innerHTML = "_X,_Y,_N"+_X+_Y+_N;

    */

    let gridCount = _X * _Y;
    let minePos = [];
    for (let i=0;i<_N;i++) {
        let thisMine = Math.round(Math.random()*gridCount);
        if (!contains(minePos,thisMine)) minePos.push(thisMine);
        else i--;
    }

    /* test if the mine generating runs correctly

    let paraIndicator = document.createElement("p");
    gameArea.appendChild(paraIndicator);
    paraIndicator.innerHTML = minePos.toString();

     */

    for (let i=0;i<_Y;i++) {
        gameBoard[i] = [];
        for (let j=0;j<_X;j++) gameBoard[i][j] = 0;
        for (let currentMine of minePos) {
            let lineCount = Math.floor(currentMine / _X);
            if (lineCount == i) gameBoard[i][currentMine % _X] = -1;
        }
    }

    /* test if the mine mapping runs correctly

    for (let thisLine of gameBoard) {
        let paraIndicator = document.createElement("p");
        gameArea.appendChild(paraIndicator);
        paraIndicator.innerHTML = thisLine.toString();
    }

    */

};

function generateGrid(_X,_Y) {

};

function contains(arr,item) {
    let count = arr.length;
    while(count--) {
        if (arr[count] == item) return true;
    }
    return false;
}