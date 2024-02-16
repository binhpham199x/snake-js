import { Apple } from "./apple.js";
import { Snake } from "./snake.js";

class Gameplay {
    constructor(canvasWidth, canvasHeight, snakePosX, snakePosY, unitSize) {
        this.canvasWidth = Math.floor(canvasWidth / unitSize) * unitSize;
        this.canvasHeight = Math.floor(canvasHeight / unitSize) * unitSize;

        this.canvas = document.getElementById("gameCanvas");

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        this.canvasContext = this.canvas.getContext("2d");
        this.size = unitSize;

        this.snake = new Snake(snakePosX, snakePosY, unitSize);

        this.hasApple = false;
    }

    createRect(x, y, width, height, color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(x, y, width, height);
    }

    createApple() {
        if (this.hasApple == false) {
            let checkSnake = true;
            while (checkSnake) {
                let appleX = Math.floor((Math.random() * this.canvasHeight) / this.size) * this.size;
                let appleY = Math.floor((Math.random() * this.canvasWidth) / this.size) * this.size;

                this.apple = new Apple(this.size, "red", appleX, appleY);
                for (let i = 0; i < this.snake.snakeTail.length; ++i) {
                    if (
                        this.apple.x == this.snake.snakeTail[i].x &&
                        this.apple.y == this.snake.snakeTail[i].y
                    ) {
                        continue;
                    } else {
                        checkSnake = false;
                    }
                }
            }
            this.hasApple = true;
        }
    }
    checkHitCanvasBorder() {
        let snakeHead = this.snake.snakeTail[0];

        if (snakeHead.x == -this.size) {
            snakeHead.x = this.canvasWidth - this.size;
        } else if (snakeHead.x == this.canvasWidth) {
            snakeHead.x = 0;
        } else if (snakeHead.y == -this.size) {
            snakeHead.y = this.canvasHeight - this.size;
        } else if (snakeHead.y == this.canvasHeight) {
            snakeHead.y = 0;
        }
    }

    checkHeadHitTail() {
        let snakeHead = this.snake.snakeTail[0];
        let snakeBody = this.snake.snakeTail;

        for (let i = 1; i < this.snake.snakeTail.length; ++i) {
            if (snakeHead.x == snakeBody[i].x && snakeHead.y == snakeBody[i].y) {
                alert("GAME OVER !!! Press F5 or press OK to start a new game :D");
                location.reload();
            }
        }
    }

    checkAppleEaten() {
        if (this.snake.snakeTail[0].x == this.apple.x && this.snake.snakeTail[0].y == this.apple.y) {
            this.snake.snakeTail[this.snake.snakeTail.length] = {
                x: this.apple.x,
                y: this.apple.y,
            };
            this.hasApple = false;
            this.createApple();
        }
    }

    update() {
        this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.createApple();
        this.snake.move();
        this.checkHeadHitTail();
        this.checkAppleEaten();
        this.checkHitCanvasBorder();
    }

    draw() {
        // draw canvas background
        this.createRect(0, 0, this.canvas.width, this.canvas.height, "black");
        // draw snake
        for (let i = 0; i < this.snake.snakeTail.length; ++i) {
            let x = this.snake.snakeTail[i].x;
            let y = this.snake.snakeTail[i].y;

            this.createRect(x, y, this.size - 1, this.size - 1, "white");
        }
        // draw score
        this.canvasContext.font = "20px Arial";
        this.canvasContext.fillStyle = "#00FF42";
        this.canvasContext.fillText(
            "Score: " + (this.snake.snakeTail.length - 1),
            this.canvas.width - 120,
            20
        );
        // draw apple
        this.createRect(this.apple.x, this.apple.y, this.apple.size, this.apple.size, this.apple.color);
    }

    show() {
        this.update(); // update the data of all objects in gameplay after 1 frame
        this.draw(); // draw objects with new data on canvas
    }
}

let gameplay = new Gameplay(800, 600, 20, 20, 20);

window.onload = () => {
    setInterval(() => {
        gameplay.show();
    }, 100);
};

let timeDelay = 100;

let events = [];

window.addEventListener("keydown", (event) => {
    events.unshift(event);
    console.log(events);
});

setInterval(() => {
    let event = events.pop();

    if (!event) return;

    if (event.key == "ArrowLeft") {
        gameplay.snake.turnLeft();
    } else if (event.key == "ArrowUp") {
        gameplay.snake.turnUp();
    } else if (event.key == "ArrowRight") {
        gameplay.snake.turnRight();
    } else if (event.key == "ArrowDown") {
        gameplay.snake.turnDown();
    }
}, 10);
