let gamecontainer = document.querySelector(".game-container");
let scorecontainer = document.querySelector(".score-container");

let foodX, foodY;
let headX = 12, headY = 12;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let score = 0;

function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][1] === foodY && snakeBody[i][0] === foodX) {
            generateFood();
            return;
        }
    }
}

function gameOver() {
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;

    snakeBody = [];
    score = 0;
    scorecontainer.innerHTML = "Score : " + score;
    alert("Game Over");
}

function renderGame() {
    let updatedGame = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;

    if (foodX === headX && foodY === headY) {
        snakeBody.push([foodX, foodY]);
        generateFood();
        score += 10;
        scorecontainer.innerHTML = "Score : " + score;
    }

    snakeBody.pop();
    headX += velocityX;
    headY += velocityY;
    snakeBody.unshift([headX, headY]);

    if (headX === 0 || headY === 0 || headX === 26 || headY === 26) {
        gameOver();
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;
    }

    gamecontainer.innerHTML = updatedGame;
}

generateFood();
setInterval(renderGame, 200);

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
});
