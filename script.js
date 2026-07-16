const board = document.querySelector('.board');
const startBtn = document.querySelector('.btn-start');
const modal = document.querySelector('.modal')
const startGame = document.querySelector('.start-game')
const restartBtn = document.querySelector('.btn-restart')
const scoreElement = document.querySelector('#score')
const highScoreElement = document.querySelector('#high-score')
const timeElement = document.querySelector('#time')
const restart = document.querySelector('.restart')
const blockHeight = 30
const blockWidth = 30

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

const blocks = [];

let sec = 0;
let min = 0;
let timerId ;

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let time = `00-00`

let snake = [{ x: 1, y: 3 }];

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

highScoreElement.innerText = highScore;
// let direction = 'left';
// let direction = 'right';
// let direction = 'down';

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${i} - ${j}`] = block;
    }
}

function startTimer(){
    timerId = setInterval(() => {
        sec++;

        if(sec === 60){
            min++;
            sec = 0;
        }

        timeElement.innerText = `${min}:${sec}`;
    }, 1000);
}

function render() {
    let head = null;

    blocks[`${food.x} - ${food.y}`].classList.add("food")

    if (direction == "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    } else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(intervalId)

        clearInterval(timerId);
        modal.style.display = "block"
        startGame.style.display = "none"
        restart.style.display = "flex"
    }

    let tail = snake.pop();   // remove tail
    blocks[`${tail.x} - ${tail.y}`].classList.remove("fill");

    snake.unshift(head);



    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x} - ${food.y}`].classList.remove("food");
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };
        snake.unshift(head);

        score += 10;
        scoreElement.innerText = score

        if (score > highScore) {
            highScore = score
            localStorage.setItem("highScore", highScore.toString());
            // highScoreElement.innerText = highScore;
        }
    }

    snake.forEach(segment => {
        blocks[`${segment.x} - ${segment.y}`].classList.add("fill");
    })


}



addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up";
    } else if (event.key == "ArrowDown") {
        direction = "down";
    } else if (event.key == "ArrowLeft") {
        direction = "left";
    } else if (event.key == "ArrowRight") {
        direction = "right";
    }
})

startBtn.addEventListener("click", () => {
    intervalId = setInterval(() => {
        render();
    }, 300);

    modal.style.display = "none"
    startTimer();

})

// function restart () {
//     intervalId = setInterval(() => {
//         render();
//     }, 300)
// }

restartBtn.addEventListener("click", () => {
    modal.style.display = "none"

    clearInterval(timerId);
    sec = 0;
    min = 0;
    timeElement.innerText = "00:00";
    startTimer();

    direction = 'down';
    // food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) };

    intervalId = setInterval(() => {
        render();
    }, 300);

    score = 0;
    scoreElement.innerText = score;
    // time = `00-00`;
    
    blocks[`${food.x} - ${food.y}`].classList.remove("food");
    
    snake.forEach(segment => {
        blocks[`${segment.x} - ${segment.y}`].classList.remove("fill");
    })
    
    snake = [{ x: 1, y: 3 }]
    

})
