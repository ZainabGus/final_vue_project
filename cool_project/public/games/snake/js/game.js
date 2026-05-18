'use strict';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); //указываем, что игра 2д

const ground = new Image();
ground.src = "img/pole.png"; //добавляем поле как картинку, снизу добавили яблоко, как очко

const apple = new Image();
apple.src = "img/apple.png";  

const smile = new Image();
smile.src = "img/smile.png"; 

const over = new Image();
over.src = "img/gameover.png"; 

const box = 32;
let score = 0;
let v = 400;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box, //создаем рандомные координаты для яблок по х [1, 17], по y [3, 15]
    y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction); //обрабатываем событые нажатие клавишь

let dir;

function direction(event) {
    if(event.keyCode == 65 && dir != "right") { //коды клавишь смотреть в интернете (клавиша A)
        dir = "left";
    } else if(event.keyCode == 68 && dir != "left") {//D 
        dir = "right";
    } else if(event.keyCode == 87 && dir != "down") {//W
        dir = "up";
    } else if(event.keyCode == 83 && dir != "up") {//S
        dir = "down";
    }
}

function tail(head, arr) { //проверка, чтобы змея не ела свой хвост
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y) {
            ctx.drawImage(over, 0, 70, 600, 500)
            clearInterval(time)
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0); //отображаем поле
    ctx.drawImage(apple, food.x, food.y); //отображаем яблоко

    for(let i = 0; i < snake.length; i++) { //отображаем змею
        if(i == 0) {
            ctx.drawImage(smile, snake[0].x, snake[0].y)
        }else{
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }
    };

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 3, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++
        if(v > 50) {v -= 50};
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,  
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    }else {
        snake.pop();
    } //кушаем яблоко, если голова в той же клетке, что и яблоко. Иначе просто идем дальше

    if(snakeX < box || snakeX > box*17 ||
        snakeY < box*3 || snakeY > box*17) {
            ctx.drawImage(over, 0, 70, 600, 500)
            clearInterval(time)
        } // если змея выходит за рамки, останавливаем игру

    if(dir == "left") {snakeX -= box};
    if(dir == "right") {snakeX += box};
    if(dir == "up") {snakeY -= box};
    if(dir == "down") {snakeY += box};

    let newH = {
        x: snakeX,
        y: snakeY
    };

    tail(newH, snake)
    snake.unshift(newH);
}

let time = setInterval(drawGame, v); //создаем интервал, чтобы наша функция срабатывала каждые 100 милисекунд